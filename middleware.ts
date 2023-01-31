import { isAdmin, isSysadmin } from '@lib/auth/client'
import { NextResponse } from 'next/server'
import { withAuth } from 'next-auth/middleware'

const BASIC = new Set(['do-your-best-work-faster', 'accelerating-innovation'])

export default withAuth(
  (req) => {
    const path = req.nextUrl.pathname.substring(1).split('/').shift()!
    const roles = new Set(req.nextauth.token?.roles)
    if (!BASIC.has(path) && !roles.has('learner-full') && !isAdmin(roles)) {
      return NextResponse.rewrite(new URL('/request-access', req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname
        const roles = new Set(token?.roles)

        if (isSysadmin(token?.roles)) return true

        if (/^\/admin\/users/.test(path)) return roles.has('user-admin')
        if (/^\/admin\/reports/.test(path)) return roles.has('report-admin')
        if (
          /^\/admin\/community/.test(path) ||
          /^\/admin\/landing-page/.test(path)
        ) {
          return roles.has('landing-page-admin')
        }

        if (/^\/admin/.test(path)) return isAdmin(token?.roles)
        if (/^\/sysadmin/.test(path)) return isSysadmin(token?.roles)

        return !!token
      },
    },
  }
)

export const config = {
  // This matcher determines which paths you have to be signed in for. It works
  // with a negative lookahead (?!), so anything in that group will bypass this
  // middleware and thus will be open for unauthenticated users. Parts:
  //
  // - api|_next|index: system paths that need to bypass the auth system
  //   - api: has its own access checks
  //   - _next: static assets (CSS and JS)
  //   - index: home page when requested via router (index.rsc)
  //
  // - sign-in|learning|…: paths that do not require sign in
  //
  // - .+\\.(?!rsc): exclude all files, EXCEPT .rsc files because these are
  //   actually pages
  //
  matcher: ['/((?!api|_next|index|sign-in|learning|.+\\.(?!rsc)).+)'],
}

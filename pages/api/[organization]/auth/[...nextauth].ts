import { prisma } from '@lib/db'
import { resolve } from '@lib/organization'
import bcrypt from 'bcryptjs'
import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { DefaultUser, NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

declare module 'next-auth/jwt' {
  interface JWT {
    organizationId: string
    roles: string[]
  }
}

declare module 'next-auth' {
  interface User {
    organizationId: string
    roles: string[]
  }
  interface Session {
    organizationId: string
    roles: string[]
    user: DefaultUser
  }
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/sign-in',
  },
  providers: [
    CredentialsProvider({
      name: 'email',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'jsmith@apple.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials) return null
        const { email, password } = credentials
        const organization = await resolve(req?.body?.organization)
        const user = await prisma.user.findFirst({
          where: {
            email: email.toLowerCase(),
            OR: [
              { organizationId: organization.id },
              { roles: { has: 'system-admin' } },
            ],
          },
          select: {
            id: true,
            email: true,
            name: true,
            roles: true,
            password: true,
            organizationId: true,
          },
        })

        if (user) {
          const check = await bcrypt.compare(password, user.password)
          if (check) return { ...user, organizationId: organization.id }

          if (!user.password) {
            console.info(
              `No password found, hash: "${bcrypt.hashSync(password, 10)}"`
            )
          }
        }

        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.roles = user.roles
        token.organizationId = user.organizationId
      }
      return token
    },
    async session({ session, token }) {
      if (token.sub) session.user.id = token.sub
      session.organizationId = token.organizationId
      session.roles = token.roles
      return session
    },
  },
}

export default function auth(req: NextApiRequest, res: NextApiResponse) {
  // Pass organization (path parameter) to body because the req.query is cleared
  if (req.body && req.query?.organization) {
    req.body.organization = req.query.organization
  }

  return NextAuth(authOptions)(req, res)
}

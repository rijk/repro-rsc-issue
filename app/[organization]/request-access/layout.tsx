import AuthContext from '@lib/auth/context'
import { getServerSession } from '@lib/auth/server'
import { PropsWithChildren } from 'react'

export default async function Layout({ children }: PropsWithChildren) {
  const session = await getServerSession()
  return <AuthContext session={session}>{children}</AuthContext>
}

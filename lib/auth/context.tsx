'use client'

import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import React, { PropsWithChildren } from 'react'

type Props = PropsWithChildren & {
  session: Session | null
}

export default function AuthContext({ children, session }: Props) {
  return <SessionProvider session={session}>{children}</SessionProvider>
}

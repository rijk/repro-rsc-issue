'use client'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

import SignInDialog from '../account/SignIn'

type Props = {
  searchParams?: {
    callbackUrl?: string
  }
}

export default function SignInPage({ searchParams }: Props) {
  const router = useRouter()
  const session = useSession()

  useEffect(() => {
    if (session.status === 'authenticated') {
      const url = searchParams?.callbackUrl ?? '/'
      router.replace(url)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <SignInDialog open={true} />
}

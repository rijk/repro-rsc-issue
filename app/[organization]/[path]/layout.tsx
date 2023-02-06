// import { prisma } from '@lib/db'
// import flatten from 'lodash-es/flatten'
import { PropsWithChildren } from 'react'

type Props = PropsWithChildren & {
  params: {
    organization: string
    path: string
  }
}

export default function Layout({ children }: Props) {
  return children
}

export async function generateStaticParams() {
  return [
    {
      organization: 'repro-rsc-issue',
      path: 'accelerating-innovation',
    },
  ]
}

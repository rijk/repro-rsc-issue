import { prisma } from '@lib/db'
import flatten from 'lodash-es/flatten'
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
  if (process.env.NODE_ENV !== 'production') return []

  return []

  const orgs = await prisma.organization.findMany({ select: { hosts: true } })
  const hosts = flatten(orgs.map((org) => org.hosts))
  const paths = await prisma.path.findMany({ select: { slug: true } })

  return flatten(
    hosts.map((host) =>
      paths.map(({ slug }) => ({
        organization: host,
        path: slug,
      }))
    )
  )
}

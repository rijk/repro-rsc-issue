import { prisma } from '@lib/db'
import { resolve } from '@lib/organization'
import React, { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{
  params: {
    organization: string
  }
}>

export default async function Layout({ children, params }: Props) {
  const organization = await resolve(params.organization)

  return (
    <div className="bg-[#F9FBFF] text-body">
      {organization.name}
      <br />
      {children}
    </div>
  )
}

export async function generateStaticParams() {
  if (process.env.NODE_ENV !== 'production') return []

  const handles = await prisma.organization.findMany({
    select: { hosts: true },
  })
  return handles
    .map(({ hosts }) => hosts.map((host) => ({ organization: host })))
    .reduce((a, v) => a.concat(v), [])
}

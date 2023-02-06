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
  return [{ organization: 'repro-rsc-issue' }, { organization: 'simcorp' }]
}

import { resolve } from '@lib/organization'
import { notFound } from 'next/navigation'
import { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{
  params: {
    organization: string
  }
}>

export default async function OrganizationLayout({ children, params }: Props) {
  let organization: Awaited<ReturnType<typeof resolve>>
  try {
    organization = await resolve(params.organization)
  } catch {
    return notFound()
  }

  const colors = organization.colors
    ? ({
        '--accent-color': organization.colors.accent,
      } as React.CSSProperties)
    : undefined

  return (
    <div style={colors} className="contents">
      {children}
    </div>
  )
}

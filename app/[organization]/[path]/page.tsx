import { notFound } from 'next/navigation'

export type Props = {
  params: {
    organization: string
    path: string
  }
}

export default async function Page({ params }: Props) {
  if (params.path === 'index') {
    console.log('[organization]/[path] not found', params)
    return notFound()
  }

  return <b>Path page {params.path}</b>
}

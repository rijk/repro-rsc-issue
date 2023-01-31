export type Props = {
  params: {
    organization: string
    path: string
  }
}

export default async function Page({ params }: Props) {
  return <b>Path page {params.path}</b>
}

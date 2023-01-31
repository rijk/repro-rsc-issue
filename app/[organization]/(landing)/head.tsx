import { resolve } from '@lib/organization'

type Props = {
  params: {
    organization: string
  }
}

export default async function Head({ params }: Props) {
  const organization = await resolve(params.organization)
  return <title>{`${organization.name} Innovation Toolkit`}</title>
}

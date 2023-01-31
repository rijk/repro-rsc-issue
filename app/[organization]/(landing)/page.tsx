import { prisma } from '@lib/db'
import { resolve } from '@lib/organization'

type Props = {
  params: {
    organization: string
  }
}

export default async function LandingPage({ params }: Props) {
  const { id } = await resolve(params.organization)
  const organization = await prisma.organization.findUniqueOrThrow({
    where: { id },
    select: { landing: true },
  })

  return (
    <span>
      Landing page for <b>{organization.landing?.title}</b>
    </span>
  )
}

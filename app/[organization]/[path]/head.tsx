import { prisma } from '@lib/db'

import type { Props } from './page'

export default async function Head({ params }: Props) {
  const path = await prisma.path.findUnique({
    where: { slug: params.path },
    select: { title: true },
  })

  if (path) return <title>{path.title}</title>
}

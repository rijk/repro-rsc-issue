import { getServerSession } from '@lib/auth/server'
import { prisma } from '@lib/db'
import { getErrorMessage } from '@lib/functions'
import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

type Data = {
  error?: string
  issues?: z.ZodIssue[]
}

const action = z.object({
  lesson: z.string(),
  action: z.enum(['view', 'play', 'complete', 'download']),
})

export type Input = z.input<typeof action>

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const input = action.parse(req.body)
  const session = await getServerSession(req, res)

  try {
    const lesson = await prisma.lesson.findFirstOrThrow({
      where: { slug: input.lesson },
      select: { id: true },
    })

    await prisma.authenticate(session).progress.upsert({
      create: {
        userId: session.user.id,
        lessonId: lesson.id,
        [`${input.action}ed`.replace('eed', 'ed')]: new Date(),
      },
      update:
        input.action === 'complete'
          ? { completed: new Date() }
          : { [`${input.action}ed`]: { push: new Date() } },
      where: {
        userId_lessonId: {
          userId: session.user.id,
          lessonId: lesson.id,
        },
      },
    })

    res.json({})
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) })
  }
}

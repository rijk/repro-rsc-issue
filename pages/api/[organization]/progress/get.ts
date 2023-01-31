import { getServerSession } from '@lib/auth/server'
import { prisma } from '@lib/db'
import { getErrorMessage } from '@lib/functions'
import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

export type ProgressStatus = Array<'viewed' | 'played' | 'completed'>

export type Data = {
  progress?: { lesson: string; status: ProgressStatus }[]
  error?: string
  issues?: z.ZodIssue[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await getServerSession(req, res)

  try {
    const progress = await prisma.authenticate(session).progress.findMany({
      include: { lesson: { select: { slug: true } } },
    })
    res.json({
      progress: progress.map((row) => ({
        lesson: row.lesson.slug,
        status: [
          row.viewed.length > 0 && 'viewed',
          row.played.length > 0 && 'played',
          row.completed && 'completed',
        ].filter(Boolean) as ProgressStatus,
      })),
    })
  } catch (error) {
    res.status(500).json({ error: getErrorMessage(error) })
  }
}

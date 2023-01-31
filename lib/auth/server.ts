import { NextApiRequest, NextApiResponse } from 'next'
import { Session, unstable_getServerSession } from 'next-auth'

import { authOptions } from '../../pages/api/[organization]/auth/[...nextauth]'

export function getServerSession(): Promise<Session | null>
export function getServerSession(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<Session>
export async function getServerSession(
  req?: NextApiRequest,
  res?: NextApiResponse
) {
  if (req && res) {
    const session = unstable_getServerSession(req, res, authOptions)
    if (!session) throw new Error('You must be signed to do this')
    return session
  } else {
    return unstable_getServerSession(authOptions)
  }
}

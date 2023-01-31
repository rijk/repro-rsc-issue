import type { Prisma } from '@prisma/client'

import { prisma } from '../db'

export const organizationFilter: Prisma.Middleware = async (params, next) => {
  if (params.action === 'findMany' && params.model === 'User') {
    params.args.where ??= {}
    params.args.where['organizationId'] = prisma.organizationId
  }

  if (params.model === 'Progress') {
    if (params.args?.where?.userId_lessonId) {
      params.args.where.userId_lessonId.userId = prisma.userId
    } else {
      params.args ??= {}
      params.args.where ??= {}
      params.args.where['userId'] = prisma.userId
    }
  }

  return next(params)
}

import { isAdmin, isSysadmin } from '@lib/auth/client'
import type { Prisma } from '@prisma/client'
import isEqual from 'lodash-es/isEqual'

import { prisma } from '../db'

const notAllowedError = new Error('Sorry, you are not allowed to do this')

const checkPermission = async ({
  model,
  action,
  args,
}: Prisma.MiddlewareParams) => {
  if (isSysadmin(prisma.roles)) return true

  if (model === 'Organization') {
    if (action === 'findRaw' && typeof args?.filter?.hosts === 'string') {
      // Query from resolve function, always allowed
      return true
    } else if (/findUnique/.test(action)) {
      // Targeted fetches always allowed
      return true
    } else if (/update/.test(action)) {
      if (isEqual(Object.keys(args.data), ['landing'])) {
        return prisma.roles?.has('landing-page-admin')
      }
    } else if (/find/.test(action)) {
      // Calls done by generateStaticParams()
      if (isEqual(args?.select, { hosts: true })) return true
    }
  } else if (model === 'User') {
    // Sign in
    if (action === 'findFirst' && args.where?.email) return true

    if (action === 'create') return true

    if (isAdmin(prisma.roles)) {
      if (action === 'findMany') {
        return args.where.organizationId === prisma.organizationId
      } else if (action === 'update') {
        // Check if the user belongs to this admin's organization
        const user = await prisma.user.findFirstOrThrow({
          where: args.where,
        })
        return user.organizationId === prisma.organizationId
      }
    }

    if (
      prisma.userId &&
      action === 'update' &&
      args.where.id === prisma.userId
    ) {
      const updateableKeysOnOwnUser = new Set(['requests'])
      return Object.keys(args.data).every((key) =>
        updateableKeysOnOwnUser.has(key)
      )
    }
  } else if (
    model === 'Path' ||
    model === 'Module' ||
    model === 'Lesson' ||
    model === 'Resource' ||
    model === 'ResourceCategory' ||
    model === 'Event' ||
    model === 'Link'
  ) {
    if (/find/.test(action)) {
      // Read doesn't need to be super secure; authorization will be handled
      // through the middleware and it's only read anyway
      return true
    }
  } else if (model === 'Progress') {
    if (prisma.userId) {
      if (
        args?.where.userId === prisma.userId ||
        args?.where.userId_lessonId?.userId === prisma.userId
      )
        return true
    }
  }

  if (action === 'runCommandRaw') return true

  console.error(`Error: No permission to ${action} on ${model}`, args)
  return false
}

export const rules: Prisma.Middleware = async (params, next) => {
  const { model, action, args } = params

  // Check authorization
  if (!(await checkPermission(params))) throw notAllowedError

  // Automatically set fields
  switch (model) {
    case 'Path':
    case 'Module':
      // Updated by/at timestamp
      if (/update/.test(action)) {
        args.data.updated = {
          by: prisma.userId,
          at: new Date(),
        }
      }
  }

  return next(params)
}

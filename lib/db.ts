import { PrismaClient } from '@prisma/client'
import { Session } from 'next-auth'

declare global {
  // eslint-disable-next-line no-var
  var devPrisma: PrismaClient | undefined
}

interface AuthenticatedPrismaClient extends PrismaClient {
  authenticate: (session: Session | null) => AuthenticatedPrismaClient
  userId?: string
  organizationId?: string
  roles?: Set<string>
}

import { organizationFilter } from './db/filter'
import { rules } from './db/rules'

// Used for checking roles in rules middleware
const authenticate = (session: Session | null) => {
  prisma.roles = new Set(session?.roles)
  prisma.userId = session?.user.id
  prisma.organizationId = session?.organizationId
  return prisma
}

// We use a global to prevent opening new Prisma instances on hot reload in dev
export const prisma: AuthenticatedPrismaClient = Object.assign(
  global.devPrisma || new PrismaClient(),
  { authenticate }
)

// The next block is either for production or first run on dev
if (!global.devPrisma) {
  prisma.$use(organizationFilter)
  prisma.$use(rules)

  if (process.env.NODE_ENV !== 'production') global.devPrisma = prisma
}

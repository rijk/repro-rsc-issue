import { Organization } from '@prisma/client'

import { prisma } from './db'

const domains = ['localhost', 'enterpriseinnovationtoolkit.com', 'ajsdx.com']
const regexp = new RegExp(
  `(?<organization>.+?)(\.(${domains.join('|')}))?(:[0-9]+)?$`
)

export const getHandleFromHost = (host: string) =>
  regexp.exec(host)?.groups?.organization

/**
 * This is a manual cache for resolved host -> OrganizationDetails. We store the
 * promises to avoid querying the database multiple times during React
 * concurrent rendering
 */
type OrganizationDetails = Pick<
  Organization,
  'id' | 'name' | 'colors' | 'logos'
>
const resolving: Map<string, Promise<OrganizationDetails>> = new Map()
export const resolve = async (host?: string) => {
  if (!host) throw new Error('No organization passed')

  if (!resolving.has(host)) {
    resolving.set(
      host,
      new Promise(async (resolve, reject) => {
        const results = await prisma.organization.findRaw({
          filter: {
            hosts: host,
          },
          options: {
            projection: {
              _id: false,
              id: { $toString: '$_id' },
              name: true,
              colors: true,
              logos: true,
              hosts: true,
            },
          },
        })

        if (results[0]) {
          return resolve(results[0] as OrganizationDetails)
        }

        try {
          // Fall back to AJ&Smart's generic instance
          const ajsmart = await prisma.organization.findUniqueOrThrow({
            where: { id: process.env.GENERIC_INSTANCE_ID },
          })

          return resolve(ajsmart)
        } catch {
          console.error(
            `Generic instance (ID: ${process.env.GENERIC_INSTANCE_ID}) not found`
          )
          reject('Generic instance not found')
        }

        reject(`Organization "${host}" not found`)
      })
    )
  }

  // We checked above, it's guaranteed to return a promise at this point
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return resolving.get(host)!
}

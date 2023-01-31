import flatten from 'lodash-es/flatten'

import { prisma } from './db'

let hosts: string[]
const getHosts = async () => {
  if (hosts) return hosts

  const orgs = await prisma.organization.findMany({ select: { hosts: true } })
  hosts = flatten(orgs.map((org) => org.hosts))
  return hosts
}

export default async function revalidate(
  path: string | string[],
  hosts?: string[]
) {
  const paths = Array.isArray(path) ? path : [path]
  hosts ??= await getHosts()

  if (process.env.NODE_ENV !== 'production') {
    console.info(
      'revalidate() called for:\n' + paths.map((p) => `- /${p}`).join('\n')
    )
    return []
  }

  return Promise.allSettled(
    hosts.map(async (host) => {
      const hostname = /\./.test(host)
        ? host
        : `${host}.${process.env.MAIN_DOMAIN}`

      const r = await fetch(`https://${hostname}/api/revalidate`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paths: paths.map((path) => `/${path}`),
        }),
      })

      const result = await r.json()
      return { host, ...result }
    })
  )
}

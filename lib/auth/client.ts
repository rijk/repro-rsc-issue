export const isAdmin = (roles: unknown) => {
  if (roles instanceof Set) roles = Array.from(roles)
  return Array.isArray(roles) && !!roles.find((role) => /admin/.test(role))
}

export const isSysadmin = (roles: unknown) => {
  if (Array.isArray(roles)) roles = new Set(roles)
  return roles instanceof Set && roles.has('system-admin')
}

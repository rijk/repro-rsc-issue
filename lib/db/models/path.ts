import { ObjectId } from 'bson'

export const sortModules = (path: {
  order: string[]
  modules: { id: string }[]
}) => {
  path.modules.sort((a, b) => {
    const ai = path.order.indexOf(a.id)
    const bi = path.order.indexOf(b.id)
    if (ai > -1 && bi > -1) return ai - bi

    // Fall back to creation date
    return new ObjectId(a.id) > new ObjectId(b.id) ? 1 : -1
  })
}

import { ObjectId } from 'bson'

export const sortLessons = (module: {
  order: string[]
  lessons: { id: string }[]
}) => {
  module.lessons.sort((a, b) => {
    const ai = module.order.indexOf(a.id)
    const bi = module.order.indexOf(b.id)
    if (ai > -1 && bi > -1) return ai - bi

    // Fall back to creation date
    return new ObjectId(a.id) > new ObjectId(b.id) ? 1 : -1
  })
}

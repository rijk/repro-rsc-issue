import { useReducer } from 'react'

const fur = (x: number): number => x + 1
export const useForceUpdate = () => useReducer(fur, 0)[1]

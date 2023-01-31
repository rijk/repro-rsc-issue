'use client'

import { useEffect } from 'react'

type Props = {
  selector: string
}

export default function ScrollIntoView({ selector }: Props) {
  useEffect(() => {
    document.querySelector(selector)?.scrollIntoView({ block: 'center' })
  }, [selector])

  return null
}

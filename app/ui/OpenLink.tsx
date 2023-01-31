'use client'

import { ArrowUpRightIcon } from '@heroicons/react/20/solid'

type Props = {
  text?: string
  url: string
}

export default function OpenLink({ text, url }: Props) {
  return (
    <span
      onClick={(e) => {
        e.preventDefault()
        window.open(url)
      }}
      className="inline-flex items-center gap-2 transition-colors hover:text-accent"
    >
      <span className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
        {text ?? url}
      </span>
      <ArrowUpRightIcon className="h-4 w-4" />
    </span>
  )
}

import { SquaresPlusIcon } from '@heroicons/react/20/solid'
import type { Module, Path } from '@prisma/client'
import Link from 'next/link'

type Props = {
  path: Path
  module: Module & { _count: { lessons: number } }
}

export default function Module({ path, module }: Props) {
  return (
    <Link
      href={`/api/module/continue?path=${path.slug}&module=${module.slug}`}
      className="relative block self-start rounded-xl bg-white p-10 shadow-lg shadow-black/5 hover:shadow-black/10"
    >
      <small className="text-sm text-path">{path.title}</small>
      <h2 className="font-bold">{module.title}</h2>
      <div className="flex divide-x divide-path/12 pt-5 text-sm">
        <div className="flex items-center gap-2 px-4 pl-0">
          <SquaresPlusIcon className="h-4 w-4 flex-none text-path" />
          <span>
            <strong>{module._count.lessons}</strong>{' '}
            {module._count.lessons === 1 ? 'lesson' : 'lessons'}
          </span>
        </div>
      </div>
    </Link>
  )
}

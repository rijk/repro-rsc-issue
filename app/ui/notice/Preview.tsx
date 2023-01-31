'use client'

import { InformationCircleIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/navigation'

export default function Preview() {
  const router = useRouter()
  return (
    <div className="rounded-md bg-cyan-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <InformationCircleIcon
            className="h-5 w-5 text-cyan-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-cyan-800">Previewing</h3>
          <div className="mt-2 text-sm text-cyan-700">
            <p>You’re currently previewing the unpublished draft version.</p>
          </div>
          <div className="mt-4">
            <div className="-mx-2 -my-1.5 flex">
              <button
                type="button"
                className="rounded-md bg-cyan-50 px-2 py-1.5 text-sm font-medium text-cyan-800 hover:bg-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2 focus:ring-offset-cyan-50"
                onClick={async () => {
                  await fetch('/api/preview')
                  router.refresh()
                }}
              >
                Exit preview
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

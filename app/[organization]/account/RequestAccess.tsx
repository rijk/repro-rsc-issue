'use client'

import { Dialog, Transition } from '@headlessui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment, useState } from 'react'

const noop = () => {}

type Props = {
  open: boolean
  onClose?: () => void
}

export default function RequestAccessDialog({ open, onClose }: Props) {
  const path = usePathname()
  const [done, setDone] = useState(false)

  const request = () =>
    fetch('/api/request-access', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ path }),
    }).then(() => setDone(true))

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose ?? noop}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0" />
        </Transition.Child>

        <div
          className="fixed inset-0 z-10 overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                {!done ? (
                  <div>
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Hi there!
                    </Dialog.Title>
                    <div className="mt-4 flex flex-col gap-4">
                      <p className="text-sm text-gray-500">
                        We’re thrilled that you want to dive deeper into the
                        course after the taster!
                      </p>
                      <p className="text-sm text-gray-500">
                        If you are a part of the pilot and you request access,
                        you will be assigned a course license from your company.
                      </p>
                      <p className="text-sm text-gray-500">
                        Please note that it may take up to 24 hours to gain full
                        access.
                      </p>
                      <div className="mt-2 flex justify-between">
                        <Link
                          href="/"
                          type="submit"
                          className="button bg-white"
                        >
                          Not right now
                        </Link>
                        <button
                          type="submit"
                          className="button"
                          onClick={request}
                        >
                          Request full access {'->'}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Access requested
                    </Dialog.Title>
                    <div className="mt-4 flex flex-col gap-4">
                      <p className="text-sm text-gray-500">
                        Success! Your request has been received, once your
                        training supervisor approves your request, you’ll get
                        notified.
                      </p>
                      <div className="mt-2 flex justify-between">
                        <div />
                        <Link href="/learning" className="button">
                          Return to the portal
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

'use client'

import { Dialog, Transition } from '@headlessui/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { FormEvent, Fragment, useState } from 'react'
import { useFormState } from 'react-use-form-state'

const noop = () => {}

type Props = {
  open: boolean
  onClose?: () => void
}

type Fields = {
  email: string
  password: string
  name?: string
  signUp: boolean
}

export default function SignInDialog({ open, onClose }: Props) {
  const [form, { email, text, password }] = useFormState<Fields>()
  const [done, setDone] = useState(false)
  const router = useRouter()
  const params = useSearchParams()

  const signin = async (e: FormEvent) => {
    e.preventDefault()
    const callbackUrl = params.get('callbackUrl') ?? undefined
    const res = await signIn('credentials', {
      redirect: false,
      ...form.values,
    })

    if (res?.ok && !res.error) {
      onClose?.()
      if (callbackUrl) {
        router.replace(callbackUrl)

        // Next router caches the redirect, so we have to do a hard reload
        window.location.href = callbackUrl
      } else {
        router.refresh()
      }
    } else {
      form.setFieldError('password', 'Incorrect email or password')
    }
  }

  const signup = (e: FormEvent) => {
    e.preventDefault()
    fetch('/api/sign-up', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form.values),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) throw res.error
      })
      .then(() => setDone(true))
      .then(() => signIn('credentials', form.values))
      .catch((error) => {
        console.error('Error creating user:', error)
        if (error?.code === 'P2002') {
          // Email already exists, try to sign in instead
          signin(e)
          form.setField('signUp', false)
        } else {
          form.setFieldError('password', 'Sorry, something went wrong')
        }
      })
  }

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
          <div className="fixed inset-0 bg-slate-500 bg-opacity-25 backdrop-blur transition-opacity" />
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
                {form.values.signUp ? (
                  <div>
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Sign up
                    </Dialog.Title>
                    {done ? (
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Check your inbox for a confirmation link. After
                          clicking this you can sign in.
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Welcome! Create an account to get access.
                          </p>
                        </div>
                        <form
                          action="/api/sign-up"
                          method="post"
                          className="mt-4 grid gap-3"
                          onSubmit={signup}
                        >
                          <input
                            {...text('name')}
                            autoFocus
                            required
                            placeholder="Your full name"
                            className="w-full rounded-md border-gray-300 text-gray-900 placeholder-gray-500 sm:text-sm"
                          />
                          <input
                            {...email('email')}
                            required
                            placeholder="Email address"
                            className="w-full rounded-md border-gray-300 text-gray-900 placeholder-gray-500 sm:text-sm"
                          />
                          <input
                            {...password('password')}
                            required
                            placeholder="Password"
                            className="w-full rounded-md border-gray-300 text-gray-900 placeholder-gray-500 sm:text-sm"
                          />
                          {!!form.errors?.password && (
                            <div className="text-sm text-red-600">
                              {form.errors?.password}
                            </div>
                          )}
                          <button type="submit" className="button">
                            Sign up &rarr;
                          </button>
                        </form>
                      </>
                    )}
                  </div>
                ) : (
                  <div>
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Sign in
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Sign in using your email address to get access to the
                        course materials.
                      </p>
                    </div>
                    <form className="mt-4 grid gap-3" onSubmit={signin}>
                      <input
                        {...email('email')}
                        autoFocus
                        required
                        placeholder="Email address"
                        className="w-full rounded-md border-gray-300 text-gray-900 placeholder-gray-500 sm:text-sm"
                      />
                      <input
                        {...password('password')}
                        required
                        placeholder="Password"
                        className="w-full rounded-md border-gray-300 text-gray-900 placeholder-gray-500 sm:text-sm"
                      />
                      {!!form.errors?.password && (
                        <div className="text-sm text-red-600">
                          {form.errors?.password}
                        </div>
                      )}
                      <div className="flex items-center justify-between gap-4">
                        <button type="submit" className="button">
                          Sign in &rarr;
                        </button>
                        <a
                          onClick={() => form.setField('signUp', true)}
                          className="text-sm font-medium text-blue-700"
                        >
                          No account yet?
                        </a>
                      </div>
                    </form>
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

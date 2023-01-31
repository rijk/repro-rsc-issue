'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentProps } from 'react'

type Props = ComponentProps<typeof Link>

export default function ActiveLink(props: Props) {
  const active = props.href === usePathname()
  return <Link data-active={active} {...props} />
}

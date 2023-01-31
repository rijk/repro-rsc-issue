import '../styles/globals.css'

import { Inter } from '@next/font/google'
import { PropsWithChildren } from 'react'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html className={inter.variable}>
      <head>
        <title>AJ&Smart Innovation Toolkit</title>
      </head>
      <body className="min-h-full bg-slate-200 selection:bg-accent selection:text-white">
        {children}
      </body>
    </html>
  )
}

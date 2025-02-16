'use client'

import './globals.css'

import clsx from 'clsx'
import { Geist, Geist_Mono } from 'next/font/google'
import React, { useState } from 'react'
import { Provider } from 'react-redux'

import { Header } from '@/components/layout/header'
import { store } from '@/store/store'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false)

  return (
    //add className='dark' to html tag to enable dark mode
    <html
      lang='en'
      className={clsx({
        dark: isDark
      })}
    >
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider store={store}>
          <Header isDark={isDark} setIsDark={setIsDark} />
          <main className='mx-auto'>{children}</main>
        </Provider>
      </body>
    </html>
  )
}

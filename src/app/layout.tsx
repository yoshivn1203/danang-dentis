'use client'

import './globals.css'

import clsx from 'clsx'
import { Geist, Geist_Mono } from 'next/font/google'
import React from 'react'
import { Provider } from 'react-redux'
import { useSelector } from 'react-redux'

import { Header } from '@/components/layout/header'
import { RootState, store } from '@/store/store'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

function RootLayoutContent({ children }: { children: React.ReactNode }) {
  const isDark = useSelector((state: RootState) => state.theme.isDark)

  return (
    //add className='dark' to html tag to enable dark mode
    <html
      lang='en'
      className={clsx({
        dark: isDark
      })}
    >
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`}>
        <Header />
        <main className='mx-auto'>{children}</main>
      </body>
    </html>
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <RootLayoutContent>{children}</RootLayoutContent>
    </Provider>
  )
}

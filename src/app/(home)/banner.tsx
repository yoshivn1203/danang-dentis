'use client'

import Image from 'next/image'
import Link from 'next/link'

import heroImage from '@/assets/images/hero.jpg'
import { Button } from '@/components/ui/button'

export function Banner() {
  return (
    <section className='relative'>
      <div className='absolute inset-0'>
        <Image
          src={heroImage}
          alt='Dental clinic hero image'
          fill
          className='object-cover'
          priority
          placeholder='blur'
        />
      </div>
      <div
        className={
          'absolute inset-0 bg-background/75 bg-transparent bg-gradient-to-r from-white/95 sm:to-white/25 dark:from-black/95 dark:to-black/25 '
        }
      ></div>
      <div className='relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-[80vh] lg:items-center lg:px-8'>
        <div className='max-w-xl ltr:sm:text-left rtl:sm:text-right'>
          <h1 className='text-3xl font-extrabold sm:text-5xl text-foreground'>
            Quality Dental Care
            <strong className='block font-extrabold text-rose-700'> in Da Nang, Vietnam </strong>
          </h1>

          <p className='mt-4 max-w-lg sm:text-xl/relaxed'>
            Experience world-class dental treatments at a fraction of the cost. Join thousands of
            satisfied patients who chose Da Nang for their dental care needs.
          </p>

          <div className='mt-8'>
            <Link href='/booking'>
              <Button variant='destructive' className='text-sm px-12 py-6 text-md font-semibold'>
                BOOK NOW
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

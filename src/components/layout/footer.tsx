'use client'

import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export function Footer() {
  return (
    <footer className='bg-gray-100 dark:bg-gray-900 border-t'>
      <div className='mx-auto max-w-screen-2xl px-4 pt-8 pb-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
          {/* Brand Section */}
          <div>
            <div className='text-xl font-bold'>DANANG DENTISTS</div>
            <p className='mt-4 max-w-xs text-muted-foreground'>
              Premium dental care in Da Nang, Vietnam. International standards at affordable prices.
            </p>
            <div className='mt-8 flex gap-2'>
              <Button variant='ghost' size='icon'>
                <Facebook className='h-5 w-5' />
              </Button>
              <Button variant='ghost' size='icon'>
                <Instagram className='h-5 w-5' />
              </Button>
              <Button variant='ghost' size='icon'>
                <Mail className='h-5 w-5' />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className='grid grid-cols-2 gap-8 lg:col-span-2 lg:grid-cols-3'>
            <div>
              <p className='font-medium'>Company</p>
              <nav className='mt-4 flex flex-col space-y-2 text-sm text-muted-foreground'>
                <Link href='/' className='hover:opacity-75'>
                  About
                </Link>
                <Link href='/' className='hover:opacity-75'>
                  How It Works
                </Link>
                <Link href='/' className='hover:opacity-75'>
                  Pricing
                </Link>
                <Link href='/' className='hover:opacity-75'>
                  Contact
                </Link>
              </nav>
            </div>

            <div>
              <p className='font-medium'>Services</p>
              <nav className='mt-4 flex flex-col space-y-2 text-sm text-muted-foreground'>
                <Link href='/services/dental-implants' className='hover:opacity-75'>
                  Dental Implants
                </Link>
                <Link href='/' className='hover:opacity-75'>
                  Crowns & Bridges
                </Link>
                <Link href='/' className='hover:opacity-75'>
                  Cosmetic Dentistry
                </Link>
                <Link href='/' className='hover:opacity-75'>
                  Cleaning & Prevention
                </Link>
              </nav>
            </div>

            <div>
              <p className='font-medium'>Contact</p>
              <nav className='mt-4 flex flex-col space-y-2 text-sm text-muted-foreground'>
                <div className='flex items-center gap-2'>
                  <Phone className='h-4 w-4' />
                  <span>84-818-548-409</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Mail className='h-4 w-4' />
                  <span>contact@danangdentists.com</span>
                </div>
                <div className='flex items-center gap-2'>
                  <MapPin className='h-4 w-4' />
                  <span>Da Nang, Vietnam</span>
                </div>
              </nav>
            </div>
          </div>
        </div>

        <div className='mt-12 border-t pt-4'>
          <div className='text-center text-sm text-muted-foreground'>
            <p>© 2024 Danang Dentists. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

'use client'

import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

export function Footer() {
  const router = useRouter()
  const pathname = usePathname()

  const scrollToSection = (sectionId: string) => {
    if (pathname !== '/') {
      // If not on home page, just navigate to home with the section hash
      router.push(`/#${sectionId}`)
    } else {
      // If already on home page, scroll to section
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <footer className='bg-gray-50 dark:bg-gray-800 border-t'>
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
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className='text-left hover:opacity-75'
                >
                  How It Works
                </button>
                <Link href='/about' className='hover:opacity-75'>
                  About Us
                </Link>
              </nav>
            </div>

            <div>
              <p className='font-medium'>Legal</p>
              <nav className='mt-4 flex flex-col space-y-2 text-sm text-muted-foreground'>
                <Link href='/legal' className='hover:opacity-75'>
                  Legal Notice
                </Link>
                <Link href='/privacy' className='hover:opacity-75'>
                  Privacy Policy
                </Link>
                <Link href='/terms' className='hover:opacity-75'>
                  Terms of Service
                </Link>
              </nav>
            </div>

            <div>
              <p className='font-medium'>Contact</p>
              <nav className='mt-4 flex flex-col space-y-2 text-sm text-muted-foreground'>
                <div className='flex items-center gap-2'>
                  <Phone className='h-4 w-4' />
                  <span>+84-818-548-409</span>
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

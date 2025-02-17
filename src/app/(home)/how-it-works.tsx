'use client'

import Image from 'next/image'

import { Button } from '@/components/ui/button'

export function HowItWorks() {
  return (
    <section className='bg-gray-50 dark:bg-gray-800'>
      <div className='py-16 px-4 max-w-4xl mx-auto '>
        <h2 className='text-3xl font-bold text-center mb-12'>How It Works</h2>

        <div className='space-y-8 md:space-y-12'>
          {/* Step 1 */}
          <div className='flex flex-col md:flex-row items-center gap-8'>
            <div className='w-full md:w-1/2 relative z-10 bg-background shadow-lg border p-12 rounded-lg dark:bg-gray-900'>
              <div className='mb-6'>
                <span className='text-2xl font-bold text-rose-600  mr-2'>1</span>
                <span className='text-2xl font-semibold'>We Curate</span>
              </div>
              <div className='max-w-sm'>
                <p className='text-muted-foreground mb-4'>
                  We carefully select and partner with the best dental clinics in Da Nang, ensuring
                  high standards of quality, safety, and patient care.
                </p>
              </div>
            </div>
            <div className='hidden md:block md:w-3/4 h-96 bg-muted rounded-lg relative -ml-16'>
              <Image
                src='/images/step-1.jpg'
                alt='Dental Clinic'
                layout='fill'
                objectFit='cover'
                className='rounded-lg'
              />
            </div>
          </div>

          {/* Step 2 */}
          <div className='flex flex-col md:flex-row items-center gap-8'>
            <div className='hidden md:block md:w-3/4 h-96 bg-muted rounded-lg relative'>
              <Image
                src='/images/step-2.jpg'
                alt='Dental Clinic'
                layout='fill'
                objectFit='cover'
                className='rounded-lg'
              />
            </div>
            <div className='w-full md:w-1/2 relative z-10 bg-background shadow-lg border p-12 rounded-lg md:-ml-16 dark:bg-gray-900'>
              <div className='mb-4'>
                <span className='text-2xl font-bold text-rose-600 mr-2'>2</span>
                <span className='text-2xl font-semibold'>You Choose</span>
              </div>
              <div className='max-w-sm'>
                <p className='text-muted-foreground mb-4'>
                  Browse through our curated list of dental services and clinics. Select the
                  treatment you need and your preferred dental office.
                </p>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className='flex flex-col md:flex-row items-center gap-8'>
            <div className='w-full md:w-1/2 relative z-10 bg-background shadow-lg border p-12 rounded-lg dark:bg-gray-900'>
              <div className='mb-6'>
                <span className='text-2xl font-bold text-rose-600 mr-2'>3</span>
                <span className='text-2xl font-semibold'>We Support</span>
              </div>
              <div className='max-w-sm'>
                <p className='text-muted-foreground mb-4'>
                  We provide transportation to your appointment and professional translation
                  services to ensure clear communication with your dental care team
                </p>
              </div>
            </div>
            <div className='hidden md:block md:w-3/4 h-96 bg-muted rounded-lg relative -ml-16'>
              <Image
                src='/images/step-3.jpg'
                alt='Dental Clinic'
                layout='fill'
                objectFit='cover'
                className='rounded-lg'
              />
            </div>
          </div>

          {/* Step 4 */}
          <div className='flex flex-col md:flex-row items-center gap-8'>
            <div className='hidden md:block md:w-3/4 h-96 bg-muted rounded-lg relative'>
              <Image
                src='/images/step-4.jpg'
                alt='Dental Clinic'
                layout='fill'
                objectFit='cover'
                className='rounded-lg'
              />
            </div>
            <div className='w-full md:w-1/2 relative z-10 bg-background shadow-lg border p-12 rounded-lg md:-ml-16 dark:bg-gray-900'>
              <div className='mb-4'>
                <span className='text-2xl font-bold text-rose-600 mr-2'>4</span>
                <span className='text-2xl font-semibold'>You Smile</span>
              </div>
              <div className='max-w-sm'>
                <p className='text-muted-foreground mb-4'>
                  Enjoy high-quality dental care with peace of mind, knowing you have support
                  throughout your entire treatment journey.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-16 text-center'>
          <Button variant='destructive' className='text-sm px-12 py-6 text-md font-semibold'>
            SCHEDULE NOW
          </Button>
        </div>
      </div>
    </section>
  )
}

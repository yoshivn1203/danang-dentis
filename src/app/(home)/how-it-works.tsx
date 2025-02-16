'use client'

import Image from 'next/image'

export function HowItWorks() {
  return (
    <section className='py-16 px-4 max-w-4xl mx-auto'>
      <h2 className='text-3xl font-bold text-center mb-12'>How It Works</h2>

      <div className='space-y-16'>
        {/* Step 1 */}
        <div className='flex flex-col md:flex-row items-center gap-8'>
          <div className='md:w-1/2 relative z-10 bg-background shadow-lg border p-12 rounded-lg'>
            <div className='mb-6'>
              <span className='text-2xl font-bold text-destructive'>1 </span>
              <span className='text-2xl font-semibold'>We Curate</span>
            </div>
            <div className='max-w-sm'>
              <p className='text-muted-foreground mb-4'>
                We carefully select and partner with the best dental clinics in Da Nang, ensuring
                high standards of quality, safety, and patient care.
              </p>
            </div>
          </div>
          <div className='md:w-3/4 h-96 bg-muted rounded-lg relative -ml-16'>
            <Image
              src='/images/1.jpg'
              alt='Dental Clinic'
              layout='fill'
              objectFit='cover'
              className='rounded-lg'
            />
          </div>
        </div>

        {/* Step 2 */}
        <div className='flex flex-col md:flex-row items-center gap-8'>
          <div className='md:w-1/2 h-64 bg-muted rounded-lg relative'>
            <Image
              src='/images/1.jpg'
              alt='Dental Clinic'
              layout='fill'
              objectFit='cover'
              className='rounded-lg'
            />
          </div>
          <div className='md:w-1/2 relative z-10 bg-background shadow-md p-4 rounded-lg -ml-16'>
            <div className='mb-4'>
              <span className='text-2xl font-bold text-destructive'>2 </span>
              <span className='text-2xl font-semibold'>We Choose</span>
            </div>
            <div className='max-w-sm'>
              <p className='text-muted-foreground mb-4'>
                Browse through our curated list of dental services and clinics. Select the treatment
                you need and your preferred dental office.
              </p>
            </div>
          </div>
        </div>

        {/* Step 3 */}

        <div className='flex flex-col md:flex-row items-center gap-8'>
          <div className='md:w-1/2 relative z-10 bg-background shadow-md p-4 rounded-lg'>
            <div className='mb-4'>
              <span className='text-2xl font-bold text-destructive'>3 </span>
              <span className='text-2xl font-semibold'>We Support</span>
            </div>
            <div className='max-w-sm'>
              <p className='text-muted-foreground mb-4'>
                We provide transportation to your appointment and professional translation services
                to ensure clear communication with your dental care team.
              </p>
            </div>
          </div>
          <div className='md:w-1/2 h-64 bg-muted rounded-lg relative -ml-16'>
            <Image
              src='/images/1.jpg'
              alt='Dental Clinic'
              layout='fill'
              objectFit='cover'
              className='rounded-lg'
            />
          </div>
        </div>

        {/* Step 4 */}
        <div className='flex flex-col md:flex-row items-center gap-8'>
          <div className='md:w-1/2 h-64 bg-muted rounded-lg relative'>
            <Image
              src='/images/1.jpg'
              alt='Dental Clinic'
              layout='fill'
              objectFit='cover'
              className='rounded-lg'
            />
          </div>
          <div className='md:w-1/2 relative z-10 bg-background shadow-md p-4 rounded-lg -ml-16'>
            <div className='mb-4'>
              <span className='text-2xl font-bold text-destructive'>4 </span>
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
    </section>
  )
}

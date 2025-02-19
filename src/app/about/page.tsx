import { Banknote, Building2, Car, Globe2, HeartPulse, Languages } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function About() {
  return (
    <div className='container mx-auto pt-16 pb-12 px-4'>
      {/* Hero Section */}
      <div className='text-center mb-16'>
        <h1 className='text-4xl font-bold mb-6'>About Danang Dental Care</h1>
      </div>

      {/* Main Content */}
      <div className='max-w-3xl mx-auto mb-16'>
        <div className='space-y-6'>
          <p className='text-muted-foreground'>
            At Danang Dental Care, we understand that seeking dental care abroad can be daunting.
            That's why we've built partnerships with Da Nang's leading dental clinics to provide
            international patients with high-quality dental services at significantly lower costs.
          </p>
          <p className='text-muted-foreground'>
            Our team of dedicated professionals ensures that language barriers and logistics never
            stand between you and excellent dental care. From translation services to
            transportation, we handle all the details so you can focus on your dental health.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className='max-w-5xl mx-auto grid md:grid-cols-3 gap-8 mb-16'>
        <div className='p-6 border rounded-lg'>
          <Languages className='h-12 w-12 mb-4 text-primary' />
          <h3 className='text-xl font-semibold mb-2'>Translation Services</h3>
          <p className='text-muted-foreground'>
            Professional interpreters to ensure clear communication between you and your dental care
            team.
          </p>
        </div>
        <div className='p-6 border rounded-lg'>
          <Car className='h-12 w-12 mb-4 text-primary' />
          <h3 className='text-xl font-semibold mb-2'>Transportation</h3>
          <p className='text-muted-foreground'>
            Convenient pick-up and drop-off services to and from your hotel and dental appointments.
          </p>
        </div>
        <div className='p-6 border rounded-lg'>
          <Building2 className='h-12 w-12 mb-4 text-primary' />
          <h3 className='text-xl font-semibold mb-2'>Clinic Partnerships</h3>
          <p className='text-muted-foreground'>
            Access to a network of verified, high-quality dental clinics in Da Nang.
          </p>
        </div>
        <div className='p-6 border rounded-lg'>
          <Globe2 className='h-12 w-12 mb-4 text-primary' />
          <h3 className='text-xl font-semibold mb-2'>International Support</h3>
          <p className='text-muted-foreground'>
            Dedicated assistance for international patients throughout their dental journey.
          </p>
        </div>
        <div className='p-6 border rounded-lg'>
          <HeartPulse className='h-12 w-12 mb-4 text-primary' />
          <h3 className='text-xl font-semibold mb-2'>Quality Assurance</h3>
          <p className='text-muted-foreground'>
            We partner only with clinics that meet international standards of dental care.
          </p>
        </div>
        <div className='p-6 border rounded-lg'>
          <Banknote className='h-12 w-12 mb-4 text-primary' />
          <h3 className='text-xl font-semibold mb-2'>Cost Savings</h3>
          <p className='text-muted-foreground'>
            Access to premium dental care at a fraction of the cost in Western countries.
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className='max-w-4xl mx-auto text-center bg-muted p-12 rounded-lg'>
        <h2 className='text-3xl font-bold mb-4'>Ready to Start Your Dental Journey?</h2>
        <p className='text-muted-foreground mb-8 max-w-2xl mx-auto'>
          Let us help you achieve the smile you've always wanted with quality dental care in Da
          Nang.
        </p>
        <Link href='/booking'>
          <Button size='lg' variant='destructive'>
            Book Your Consultation
          </Button>
        </Link>
      </div>
    </div>
  )
}

'use client'

import clsx from 'clsx'
import Image from 'next/image'
import { useState } from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'

interface Procedure {
  name: string
  price: number
  duration: string
}

interface ProcedureCategory {
  name: string
  procedures: Procedure[]
}

interface Clinic {
  id: number
  name: string
  thumbnail: string
  images: string[]
  description: string
  procedureCategories: ProcedureCategory[]
}

const clinics: Clinic[] = [
  {
    id: 1,
    name: 'Danang Dental Clinic',
    thumbnail: '/images/clinic-1.jpg',
    images: ['/images/clinic-1-1.jpg', '/images/clinic-1-2.jpg', '/images/clinic-1-3.jpg'],
    description: 'Modern dental clinic in the heart of Da Nang with state-of-the-art equipment.',
    procedureCategories: [
      {
        name: 'Implant Procedures',
        procedures: [
          { name: 'Single Implant', price: 1200, duration: '2-3 hours' },
          { name: 'Multiple Implants', price: 2200, duration: '3-4 hours' }
        ]
      },
      {
        name: 'Crowns/Veneers',
        procedures: [
          { name: 'Porcelain Crown', price: 500, duration: '1-2 hours' },
          { name: 'Dental Veneers', price: 400, duration: '1-2 hours' }
        ]
      }
      // Add more categories as needed
    ]
  }
  // Add more clinics here
]

export default function BookingPage() {
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null)

  return (
    <div className='container mx-auto py-8'>
      <h1 className='text-3xl font-bold mb-8'>Book an Appointment</h1>

      {/* Clinic Selection */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8'>
        {clinics.map(clinic => (
          <div key={clinic.id} className='cursor-pointer' onClick={() => setSelectedClinic(clinic)}>
            <div className='relative aspect-video rounded-lg overflow-hidden'>
              <Image
                src={clinic.thumbnail}
                alt={clinic.name}
                fill
                className={clsx(
                  'object-cover transition-all duration-300',
                  selectedClinic?.id === clinic.id ? 'opacity-100' : 'opacity-50 hover:opacity-75'
                )}
              />
            </div>
            <h3 className='mt-2 font-medium'>{clinic.name}</h3>
          </div>
        ))}
      </div>

      {/* Selected Clinic Details */}
      {selectedClinic && (
        <div className='space-y-8'>
          {/* Image Gallery */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {selectedClinic.images.map((image, index) => (
              <div key={index} className='relative aspect-video rounded-lg overflow-hidden'>
                <Image
                  src={image}
                  alt={`${selectedClinic.name} - Image ${index + 1}`}
                  fill
                  className='object-cover'
                />
              </div>
            ))}
          </div>

          {/* Clinic Info and Procedures */}
          <div>
            <h2 className='text-2xl font-bold mb-4'>{selectedClinic.name}</h2>
            <p className='text-muted-foreground mb-6'>{selectedClinic.description}</p>

            {/* Procedures */}
            <div className='space-y-4'>
              <h2 className='text-2xl font-bold'>Prices and Procedures</h2>

              <Accordion type='single' collapsible className='w-full'>
                {selectedClinic.procedureCategories.map((category, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className='px-4'>
                      {`${index + 1}. ${category.name}`}
                    </AccordionTrigger>
                    <AccordionContent className='px-4'>
                      <table className='w-full'>
                        <thead>
                          <tr className='text-sm text-muted-foreground'>
                            <th className='text-left py-2'>Procedure</th>
                            <th className='text-right py-2'>Price</th>
                            <th className='text-right py-2'>Duration</th>
                          </tr>
                        </thead>
                        <tbody>
                          {category.procedures.map((procedure, procIndex) => (
                            <tr key={procIndex} className='border-t'>
                              <td className='py-2'>{procedure.name}</td>
                              <td className='text-right py-2'>${procedure.price}</td>
                              <td className='text-right py-2'>{procedure.duration}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

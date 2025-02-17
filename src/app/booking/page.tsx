'use client'

import clsx from 'clsx'
import { Check } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Steps } from '@/components/ui/steps'

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

interface BookingData {
  firstName: string
  lastName: string
  address: string
  age: string
  nationality: string
  appointmentDate: string
  appointmentTime: string
  dentalProblem: string
  selectedProcedures: string[]
}

const clinics: Clinic[] = [
  {
    id: 1,
    name: 'Dr.Bao Dental Clinic',
    thumbnail: '/images/dr-bao/dr-bao-1.jpg',
    images: [
      '/images/dr-bao/dr-bao-2.jpg',
      '/images/dr-bao/dr-bao-3.jpg',
      '/images/dr-bao/dr-bao-4.png'
    ],
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
  },
  {
    id: 2,
    name: 'Smile Dental Clinic',
    thumbnail: '/images/smile/smile-1.jpg',
    images: ['/images/smile/smile-2.jpg', '/images/smile/smile-3.jpg', '/images/smile/smile-4.jpg'],
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
  const [currentStep, setCurrentStep] = useState(1)
  const [bookingData, setBookingData] = useState<BookingData>({
    firstName: '',
    lastName: '',
    address: '',
    age: '',
    nationality: '',
    appointmentDate: '',
    appointmentTime: '',
    dentalProblem: '',
    selectedProcedures: []
  })

  const steps = [
    {
      title: 'Select Clinic',
      description: 'Choose a dental clinic for your appointment'
    },
    {
      title: 'Review Clinic Information',
      description: 'Review the clinic details and procedures'
    },
    {
      title: 'Book Appointment',
      description: 'Select your preferred date and time'
    },
    {
      title: 'Payment',
      description: 'Complete your booking with payment'
    }
  ]

  const handleClinicSelect = (clinic: Clinic) => {
    setSelectedClinic(clinic)
    setCurrentStep(3)
  }

  return (
    <div className='container mx-auto pt-16 pb-8'>
      <h1 className='text-3xl font-bold mb-8'>Book an Appointment</h1>

      <div className='flex gap-8'>
        {/* Vertical Steps using the new component */}
        <div className='hidden md:block w-64 flex-shrink-0'>
          <div className='sticky top-8'>
            <Steps steps={steps} currentStep={currentStep} />
          </div>
        </div>

        {/* Main Content */}
        <div className='flex-1 space-y-8'>
          {/* Step 1: Clinic Selection */}
          <Card>
            <CardHeader>
              <CardTitle>1. Select Clinic</CardTitle>
              <CardDescription>Choose a dental clinic for your appointment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {clinics.map(clinic => (
                  <div
                    key={clinic.id}
                    className='cursor-pointer group'
                    onClick={() => handleClinicSelect(clinic)}
                  >
                    <div
                      className={clsx(
                        'relative aspect-video rounded-lg overflow-hidden',
                        'transition-all duration-300',
                        selectedClinic?.id === clinic.id && 'ring-2 ring-rose-600'
                      )}
                    >
                      <Image
                        src={clinic.thumbnail}
                        alt={clinic.name}
                        fill
                        className={clsx(
                          'object-cover transition-all duration-300',
                          selectedClinic?.id === clinic.id
                            ? 'opacity-100'
                            : 'opacity-80 group-hover:opacity-90'
                        )}
                      />
                      {selectedClinic?.id === clinic.id && (
                        <div className='absolute top-2 right-2 bg-rose-600 text-white rounded-full p-1'>
                          <Check className='h-4 w-4' />
                        </div>
                      )}
                    </div>
                    <h3 className='mt-2 font-semibold'>{clinic.name}</h3>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Step 2: Clinic Information */}
          {selectedClinic && (
            <Card>
              <CardHeader>
                <CardTitle>2. Clinic Information</CardTitle>
                <CardDescription>
                  Review the clinic details and available procedures
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                  <h2 className='text-2xl font-bold mb-4'>{selectedClinic.name}</h2>
                  <p className='text-muted-foreground mb-6'>{selectedClinic.description}</p>

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

                  {/* Procedures */}
                  <div className='space-y-4 mt-8'>
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
              </CardContent>
            </Card>
          )}

          {/* Step 3: Appointment Booking */}
          {selectedClinic && (
            <Card>
              <CardHeader>
                <CardTitle>3. Book Your Appointment</CardTitle>
                <CardDescription>
                  Fill in your personal details and preferred schedule
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-6'>
                  {/* Personal Information Section */}
                  <div className='space-y-4'>
                    <h3 className='font-semibold text-md'>Personal Information</h3>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div>
                        <label className='block text-sm font-medium mb-2'>First Name</label>
                        <input
                          type='text'
                          className='w-full p-2 border rounded-lg'
                          value={bookingData.firstName}
                          onChange={e =>
                            setBookingData({ ...bookingData, firstName: e.target.value })
                          }
                          placeholder='Enter your first name'
                        />
                      </div>
                      <div>
                        <label className='block text-sm font-medium mb-2'>Last Name</label>
                        <input
                          type='text'
                          className='w-full p-2 border rounded-lg'
                          value={bookingData.lastName}
                          onChange={e =>
                            setBookingData({ ...bookingData, lastName: e.target.value })
                          }
                          placeholder='Enter your last name'
                        />
                      </div>
                    </div>

                    <div>
                      <label className='block text-sm font-medium mb-2'>Address</label>
                      <textarea
                        className='w-full p-2 border rounded-lg'
                        rows={2}
                        value={bookingData.address}
                        onChange={e => setBookingData({ ...bookingData, address: e.target.value })}
                        placeholder='Enter your full address'
                      />
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div>
                        <label className='block text-sm font-medium mb-2'>Age</label>
                        <input
                          type='number'
                          className='w-full p-2 border rounded-lg'
                          value={bookingData.age}
                          onChange={e => setBookingData({ ...bookingData, age: e.target.value })}
                          placeholder='Enter your age'
                          min='0'
                          max='120'
                        />
                      </div>
                      <div>
                        <label className='block text-sm font-medium mb-2'>Nationality</label>
                        <input
                          type='text'
                          className='w-full p-2 border rounded-lg'
                          value={bookingData.nationality}
                          onChange={e =>
                            setBookingData({ ...bookingData, nationality: e.target.value })
                          }
                          placeholder='Enter your nationality'
                        />
                      </div>
                    </div>
                  </div>

                  {/* Appointment Details Section */}
                  <div className='space-y-4'>
                    <h3 className='font-semibold text-md'>Appointment Details</h3>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div>
                        <label className='block text-sm font-medium mb-2'>Appointment Date</label>
                        <input
                          type='date'
                          className='w-full p-2 border rounded-lg'
                          value={bookingData.appointmentDate}
                          onChange={e =>
                            setBookingData({ ...bookingData, appointmentDate: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label className='block text-sm font-medium mb-2'>Preferred Time</label>
                        <input
                          type='time'
                          className='w-full p-2 border rounded-lg'
                          value={bookingData.appointmentTime}
                          onChange={e =>
                            setBookingData({ ...bookingData, appointmentTime: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <label className='block text-sm font-medium mb-2'>
                        Describe Your Dental Problem
                      </label>
                      <textarea
                        className='w-full p-2 border rounded-lg'
                        rows={4}
                        value={bookingData.dentalProblem}
                        onChange={e =>
                          setBookingData({ ...bookingData, dentalProblem: e.target.value })
                        }
                        placeholder='Please describe your dental concerns'
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Payment */}
          {selectedClinic && bookingData.appointmentDate && bookingData.appointmentTime && (
            <Card>
              <CardHeader>
                <CardTitle>4. Payment</CardTitle>
                <CardDescription>Complete your booking with payment</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Add your payment form/integration here */}
                <button
                  onClick={() => alert('Booking completed!')} // Replace with actual submission logic
                  className='px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700'
                >
                  Complete Booking
                </button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

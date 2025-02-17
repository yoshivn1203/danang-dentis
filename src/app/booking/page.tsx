'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { Check } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DateTimePicker24h } from '@/components/ui/date-time-picker'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Steps } from '@/components/ui/steps'
import { Textarea } from '@/components/ui/textarea'

interface Procedure {
  name: string
  price: {
    usd: number
    vnd: number
  }
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
          {
            name: 'Single Implant',
            price: { usd: 1200, vnd: 29000000 },
            duration: '2-3 hours'
          },
          {
            name: 'Multiple Implants (3 teeth)',
            price: { usd: 3200, vnd: 77000000 },
            duration: '4-5 hours'
          },
          {
            name: 'All-on-4 Implants',
            price: { usd: 8500, vnd: 205000000 },
            duration: '6-8 hours'
          }
        ]
      },
      {
        name: 'Cosmetic Dentistry',
        procedures: [
          {
            name: 'Porcelain Crown',
            price: { usd: 500, vnd: 12000000 },
            duration: '1-2 hours'
          },
          {
            name: 'Dental Veneers (per tooth)',
            price: { usd: 400, vnd: 9600000 },
            duration: '1-2 hours'
          },
          {
            name: 'Teeth Whitening',
            price: { usd: 300, vnd: 7200000 },
            duration: '1-1.5 hours'
          }
        ]
      },
      {
        name: 'General Dentistry',
        procedures: [
          {
            name: 'Tooth Filling',
            price: { usd: 50, vnd: 1200000 },
            duration: '30-45 mins'
          },
          {
            name: 'Root Canal Treatment',
            price: { usd: 250, vnd: 6000000 },
            duration: '1-2 hours'
          },
          {
            name: 'Deep Cleaning',
            price: { usd: 100, vnd: 2400000 },
            duration: '1 hour'
          }
        ]
      },
      {
        name: 'Orthodontics',
        procedures: [
          {
            name: 'Traditional Braces',
            price: { usd: 2500, vnd: 60000000 },
            duration: '18-24 months'
          },
          {
            name: 'Clear Aligners',
            price: { usd: 3500, vnd: 84000000 },
            duration: '12-18 months'
          },
          {
            name: 'Retainers',
            price: { usd: 200, vnd: 4800000 },
            duration: '30 mins'
          }
        ]
      }
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
          { name: 'Single Implant', price: { usd: 1200, vnd: 29000000 }, duration: '2-3 hours' },
          { name: 'Multiple Implants', price: { usd: 2200, vnd: 77000000 }, duration: '3-4 hours' }
        ]
      },
      {
        name: 'Crowns/Veneers',
        procedures: [
          { name: 'Porcelain Crown', price: { usd: 500, vnd: 12000000 }, duration: '1-2 hours' },
          { name: 'Dental Veneers', price: { usd: 400, vnd: 9600000 }, duration: '1-2 hours' }
        ]
      }
      // Add more categories as needed
    ]
  }
  // Add more clinics here
]

const formSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  address: z.string().min(5, 'Please enter your full address'),
  age: z.string().min(1, 'Age is required'),
  nationality: z.string().min(2, 'Nationality is required'),
  appointmentDateTime: z.date({
    required_error: 'Please select appointment date and time'
  }),
  dentalProblem: z
    .string()
    .min(10, 'Please provide more detail about your dental problem and the procedures you want')
})

export default function BookingPage() {
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null)
  const [currentStep, setCurrentStep] = useState(1)

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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      address: '',
      age: '',
      nationality: '',
      appointmentDateTime: undefined,
      dentalProblem: ''
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Handle form submission
    console.log(values)
  }

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
                            : 'opacity-50 group-hover:opacity-80'
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

                    <Accordion type='single' collapsible className='w-full' defaultValue='item-0'>
                      {selectedClinic.procedureCategories.map((category, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                          <AccordionTrigger className='sm:px-4 font-semibold'>
                            {`${index + 1}. ${category.name}`}
                          </AccordionTrigger>
                          <AccordionContent className='sm:px-4 sm:ml-4'>
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
                                    <td className='text-right py-2'>
                                      ${procedure.price.usd} USD
                                      <br />
                                      <span className='text-muted-foreground'>
                                        {procedure.price.vnd.toLocaleString()} VND
                                      </span>
                                    </td>
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
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                    {/* Personal Information Section */}
                    <div className='space-y-4'>
                      <h3 className='font-semibold'>Personal Information</h3>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <FormField
                          control={form.control}
                          name='firstName'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input placeholder='Enter your first name' {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name='lastName'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input placeholder='Enter your last name' {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name='address'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder='Enter your full address'
                                className='resize-none'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <FormField
                          control={form.control}
                          name='age'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Age</FormLabel>
                              <FormControl>
                                <Input
                                  type='number'
                                  placeholder='Enter your age'
                                  min='0'
                                  max='120'
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name='nationality'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nationality</FormLabel>
                              <FormControl>
                                <Input placeholder='Enter your nationality' {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Appointment Details Section */}
                    <div className='space-y-4'>
                      <h3 className='font-semibold'>Appointment Details</h3>
                      <FormField
                        control={form.control}
                        name='appointmentDateTime'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Appointment Date and Time</FormLabel>
                            <FormControl>
                              <DateTimePicker24h
                                date={field.value}
                                setDate={date => field.onChange(date)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name='dentalProblem'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Describe Your Dental Problem And The Procedures You Want
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder='Please describe your dental concerns'
                                className='resize-none'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Payment */}
          {selectedClinic && (
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

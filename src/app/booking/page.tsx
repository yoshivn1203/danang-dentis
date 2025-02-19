'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { format } from 'date-fns'
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
import { Button } from '@/components/ui/button'
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

import { Clinic, clinics, Package, packages } from './clinic-data'

const formSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phoneNumber: z.string().min(10, 'Please enter a valid phone number'),
  age: z.string().min(1, 'Age is required'),
  nationality: z.string().min(2, 'Nationality is required'),
  appointmentDateTime: z.date({
    required_error: 'Please select appointment date and time'
  }),
  alternateDateTime1: z.date().optional(),
  alternateDateTime2: z.date().optional(),
  dentalProblem: z
    .string()
    .min(10, 'Please provide more detail about your dental problem and the procedures you want')
})

export default function BookingPage() {
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedPackage, setSelectedPackage] = useState<Package>(packages[0])
  const [isSubmitting, setIsSubmitting] = useState(false)

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
      fullName: '',
      email: '',
      phoneNumber: '',
      age: '',
      nationality: '',
      appointmentDateTime: undefined,
      alternateDateTime1: undefined,
      alternateDateTime2: undefined,
      dentalProblem: ''
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!selectedClinic || !selectedPackage) return

    setIsSubmitting(true)

    const formatDateTime = (date: Date | undefined) => {
      return date ? format(new Date(date), 'MMM d, yyyy - HH:mm') : 'Not available'
    }

    const formattedDateAppointment = formatDateTime(values.appointmentDateTime)
    const formattedDateAlternate1 = formatDateTime(values.alternateDateTime1)
    const formattedDateAlternate2 = formatDateTime(values.alternateDateTime2)

    try {
      // Create booking data object
      const bookingData = {
        customerName: values.fullName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        age: values.age,
        nationality: values.nationality,
        appointmentTime: formattedDateAppointment,
        alternateTime1: formattedDateAlternate1,
        alternateTime2: formattedDateAlternate2,
        description: values.dentalProblem,
        clinicName: selectedClinic.name,
        package: selectedPackage.name
      }

      // Create checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          packageName: selectedPackage.name,
          packagePrice: selectedPackage.price,
          bookingData
        })
      })

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      const { url } = await response.json()
      window.location.href = url
    } catch (error) {
      console.error('Error processing booking:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isStep3Complete = () => {
    const values = form.getValues()
    const isValid = Object.keys(formSchema.shape).every(key => {
      const value = values[key as keyof typeof values]
      return value !== undefined && value !== ''
    })

    if (isValid && currentStep === 3) {
      setCurrentStep(4)
    }
  }

  form.watch(() => {
    isStep3Complete()
  })

  const handleClinicSelect = (clinic: Clinic) => {
    setSelectedClinic(clinic)
    setCurrentStep(3)
  }

  return (
    <div className='container mx-auto pt-16 pb-8'>
      <h1 className='text-3xl font-bold mb-8'>Book an Appointment</h1>

      <div className='flex gap-8'>
        <div className='hidden md:block w-64 flex-shrink-0 mb-16'>
          <div className='sticky top-8'>
            <Steps steps={steps} currentStep={currentStep} />
          </div>
        </div>

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
                          name='fullName'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder='Enter your full name' {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name='email'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input
                                  type='email'
                                  placeholder='Enter your email address'
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name='phoneNumber'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input
                                  type='tel'
                                  placeholder='Enter your phone number'
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

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
                        name='alternateDateTime1'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Alternative Date and Time (Optional)</FormLabel>
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
                        name='alternateDateTime2'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Second Alternative Date and Time (Optional)</FormLabel>
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
                <CardTitle>4. Select Package & Payment</CardTitle>
                <CardDescription>Choose your service package and complete payment</CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                  {packages.map((pkg, index) => (
                    <Card
                      key={index}
                      className={clsx(
                        'cursor-pointer transition-all duration-300 border-2  hover:border-rose-200',
                        selectedPackage?.name === pkg.name &&
                          'border-rose-500 hover:border-rose-500'
                      )}
                      onClick={() => setSelectedPackage(pkg)}
                    >
                      <CardHeader>
                        <CardTitle className='text-center'>{pkg.name}</CardTitle>
                        <CardDescription className='text-center'>${pkg.price} USD</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className='space-y-2'>
                          {pkg.features.map((feature, i) => (
                            <li key={i} className='flex items-start'>
                              <Check className='h-4 w-4 mr-2 mt-1 text-rose-500' />
                              <span className='text-sm'>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className='flex justify-center'>
                  <Button
                    onClick={form.handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                    className='w-64 h-12 mt-8 text-lg bg-gradient-to-r from-amber-300 to-yellow-400 hover:from-amber-400 hover:to-yellow-500 text-white shadow-md'
                  >
                    {isSubmitting ? 'Processing...' : 'Continue To Payment'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

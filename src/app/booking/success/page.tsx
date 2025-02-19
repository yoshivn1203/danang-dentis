'use client'

import { CheckCircle, Download, Loader2, Printer } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface OrderDetails {
  customerName: string
  email: string
  appointmentTime: string
  package: string
  clinicName: string
  paymentId: string
  alternateTime1?: string
  alternateTime2?: string
  // Add other fields you want to display
}

export default function SuccessPage() {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const receiptRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`/api/get-session?session_id=${sessionId}`)
        const data = await response.json()
        setOrderDetails(data)
      } catch (error) {
        console.error('Error fetching order details:', error)
        setError('An error occurred while fetching your booking details.')
      } finally {
        setLoading(false)
      }
    }

    if (sessionId) {
      fetchOrderDetails()
    }
  }, [sessionId])

  const handlePrint = () => {
    window.print()
  }

  const handleDownloadPDF = async () => {
    if (receiptRef.current) {
      // Store references to elements we want to hide
      const successMessage = receiptRef.current.querySelector('#success-message')
      const buttons = receiptRef.current.querySelector('#action-buttons')

      // Temporarily hide elements
      if (successMessage) successMessage.classList.add('hidden')
      if (buttons) buttons.classList.add('hidden')

      const html2pdf = (await import('html2pdf.js')).default as any

      const opt = {
        margin: 1,
        filename: `booking-receipt-${orderDetails?.paymentId}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      }

      try {
        await html2pdf().set(opt).from(receiptRef.current).save()
      } finally {
        // Restore visibility
        if (successMessage) successMessage.classList.remove('hidden')
        if (buttons) buttons.classList.remove('hidden')
      }
    }
  }

  if (loading) {
    return (
      <div className='h-[80vh] w-full flex flex-col items-center justify-center gap-4'>
        <Loader2 className='h-8 w-8 animate-spin text-primary' />
        <p className='text-muted-foreground'>Loading your booking details...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className='h-[80vh] w-full flex flex-col items-center justify-center gap-4'>
        <p className='text-muted-foreground'>{error}</p>
      </div>
    )
  }

  if (!orderDetails) {
    return (
      <div className='h-[80vh] w-full flex flex-col items-center justify-center gap-4'>
        <p className='text-muted-foreground'>Order details not found</p>
      </div>
    )
  }

  return (
    <div className='max-w-2xl mx-auto p-6 mt-16 mb-16 space-y-6'>
      <div className='text-center space-y-2'>
        <h1 className='text-3xl font-bold'>Thank You for Your Booking!</h1>
        <p className='text-muted-foreground !mt-4'>
          Please download or print this receipt for your records. We will contact you within 1-2
          days with more details.
        </p>
      </div>

      <Card className='print:shadow-none' ref={receiptRef}>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl'>Booking Confirmation</CardTitle>
          <div id='success-message' className='text-green-600 flex items-center gap-2'>
            <CheckCircle className='h-5 w-5' />
            <span>Payment Successful</span>
          </div>
        </CardHeader>
        <CardContent className='grid gap-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <p className='text-sm text-muted-foreground'>Customer Name</p>
              <p className='font-medium'>{orderDetails.customerName}</p>
            </div>
            <div className='space-y-2'>
              <p className='text-sm text-muted-foreground'>Email</p>
              <p className='font-medium'>{orderDetails.email}</p>
            </div>
            <div className='space-y-2'>
              <p className='text-sm text-muted-foreground'>Package</p>
              <p className='font-medium'>{orderDetails.package}</p>
            </div>
            <div className='space-y-2'>
              <p className='text-sm text-muted-foreground'>Clinic</p>
              <p className='font-medium'>{orderDetails.clinicName}</p>
            </div>
          </div>

          <div className='space-y-2'>
            <p className='text-sm text-muted-foreground'>Appointment Time</p>
            <p className='font-medium'>{orderDetails.appointmentTime}</p>
          </div>

          <div className='space-y-2'>
            <p className='text-sm text-muted-foreground'>Alternative Appointment Time</p>
            <p className='font-medium'>{orderDetails.alternateTime1}</p>
          </div>

          <div className='space-y-2'>
            <p className='text-sm text-muted-foreground'>Second Alternative Appointment Time</p>
            <p className='font-medium'>{orderDetails.alternateTime2}</p>
          </div>

          <div className='space-y-2'>
            <p className='text-sm text-muted-foreground'>Payment ID</p>
            <p className='font-medium text-sm font-mono break-all'>{orderDetails.paymentId}</p>
          </div>

          <div id='action-buttons' className='flex flex-col sm:flex-row gap-4 mt-6 print:hidden'>
            <Button variant='outline' className='shrink-0' onClick={handlePrint}>
              <Printer className='mr-2 h-4 w-4 shrink-0' />
              <span className='truncate'>Print Receipt</span>
            </Button>

            <Button variant='default' className='shrink-0' onClick={handleDownloadPDF}>
              <Download className='mr-2 h-4 w-4 shrink-0' />
              <span className='truncate'>Download PDF</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

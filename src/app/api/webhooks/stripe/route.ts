import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

import {
  AIRTABLE_BASE_ID,
  AIRTABLE_TABLE_NAME,
  AIRTABLE_TOKEN,
  STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET
} from '@/lib/constants'

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2025-01-27.acacia'
})

export async function POST(req: Request) {
  const body = await req.text()
  const headersList = await headers()
  const sig = headersList.get('stripe-signature')!
  const endpointSecret = STRIPE_WEBHOOK_SECRET

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const metadata = session.metadata

    if (!metadata) {
      return NextResponse.json({ error: 'No metadata found in session' }, { status: 400 })
    }

    try {
      // Add a delay before checking for existing records to make sure data is saved
      await new Promise(resolve => setTimeout(resolve, 2000)) // 2 second delay

      // Check if record already exists
      const encodedTableName = encodeURIComponent(AIRTABLE_TABLE_NAME)
      const checkResponse = await fetch(
        `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodedTableName}?filterByFormula={Payment ID}="${session.id}"`,
        {
          headers: {
            Authorization: `Bearer ${AIRTABLE_TOKEN}`,
            'Content-Type': 'application/json'
          }
        }
      )

      const existingRecords = await checkResponse.json()

      // If record already exists, return success without creating duplicate
      if (existingRecords.records && existingRecords.records.length > 0) {
        return NextResponse.json({ received: true })
      }

      const requestData = {
        'Customer Name': metadata.customerName,
        Email: metadata.email,
        'Phone Number': metadata.phoneNumber,
        Age: metadata.age,
        Nationality: metadata.nationality,
        'Appointment Time': metadata.appointmentTime,
        'Alternative Time 1': metadata.alternateTime1 || '',
        'Alternative Time 2': metadata.alternateTime2 || '',
        Description: metadata.description,
        Package: metadata.package,
        'Clinic Name': metadata.clinicName,
        Status: 'Paid',
        'Payment ID': session.id
      }

      // Create record in Airtable only if it doesn't exist
      const response = await fetch(
        `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodedTableName}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${AIRTABLE_TOKEN}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            fields: requestData
          })
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Airtable error:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        })
        return NextResponse.json(
          { error: `Failed to create record in Airtable: ${response.statusText}` },
          { status: response.status }
        )
      }
    } catch (error) {
      console.error('Error saving booking:', error)
      return NextResponse.json({ error: 'Error saving booking' }, { status: 500 })
    }
  }

  return NextResponse.json({ received: true })
}

import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

import { STRIPE_SECRET_KEY } from '../../create-checkout-session/route'
const STRIPE_WEBHOOK_SECRET = 'whsec_6iA9HQW13Xmy9EELfSBIugJr4XRE5dWu'

const AIRTABLE_TOKEN =
  'patZpwRYDARibM2ff.1f9a66b897fbb7fcc569a74ee0c5137dcef091bf2a1b7c949f737eaece93159d'
const AIRTABLE_BASE_ID = 'appOv6GiSHGRpmTYJ'
const AIRTABLE_TABLE_NAME = 'root'

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
      // Create record in Airtable
      const encodedTableName = encodeURIComponent(AIRTABLE_TABLE_NAME)
      const response = await fetch(
        `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodedTableName}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${AIRTABLE_TOKEN}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            fields: {
              'Customer Name': metadata.customerName,
              Email: metadata.email,
              Age: metadata.age,
              Nationality: metadata.nationality,
              'Appointment Time': metadata.appointmentTime,
              Description: metadata.description,
              'Clinic Name': metadata.clinicName,
              Package: metadata.package,
              Status: 'Paid',
              'Payment ID': session.id
            }
          })
        }
      )

      if (!response.ok) {
        throw new Error('Failed to create record in Airtable')
      }
    } catch (error) {
      console.error('Error saving booking:', error)
      return NextResponse.json({ error: 'Error saving booking' }, { status: 500 })
    }
  }

  return NextResponse.json({ received: true })
}

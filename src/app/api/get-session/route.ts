import { NextResponse } from 'next/server'
import Stripe from 'stripe'

import { STRIPE_SECRET_KEY } from '@/lib/constants'

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2025-01-27.acacia'
})

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const sessionId = searchParams.get('session_id')

  if (!sessionId) {
    return NextResponse.json({ error: 'Session ID is required' }, { status: 400 })
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    const metadata = session.metadata

    if (!metadata) {
      return NextResponse.json({ error: 'No metadata found' }, { status: 400 })
    }

    return NextResponse.json({
      paymentId: session.id,
      customerName: metadata.customerName,
      email: metadata.email,
      package: metadata.package,
      appointmentTime: metadata.appointmentTime,
      clinicName: metadata.clinicName
      // Add other fields as needed
    })
  } catch (error) {
    console.error('Error retrieving session:', error)
    return NextResponse.json({ error: 'Error retrieving session' }, { status: 500 })
  }
}

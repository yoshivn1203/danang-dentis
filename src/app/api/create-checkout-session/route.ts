import { NextResponse } from 'next/server'
import Stripe from 'stripe'

import { BASE_FE_URL, STRIPE_SECRET_KEY } from '@/lib/constants'

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2025-01-27.acacia'
})

export async function POST(req: Request) {
  const { packageName, packagePrice, bookingData } = await req.json()

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: `${BASE_FE_URL}/booking/success?session_id={CHECKOUT_SESSION_ID}&package=${packageName}`,
      cancel_url: `${BASE_FE_URL}/booking/cancel`,
      customer_email: bookingData.email,
      metadata: {
        ...bookingData // Store all booking data in metadata
      },
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${packageName} Package`
            },
            unit_amount: packagePrice * 100
          },
          quantity: 1
        }
      ]
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe session creation error:', error)
    return NextResponse.json({ error: 'Error creating checkout session' }, { status: 500 })
  }
}

import { NextResponse } from 'next/server'
import Stripe from 'stripe'

import { PACKAGE_PRICES, STRIPE_SECRET_KEY } from '@/lib/constants'

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2025-01-27.acacia'
})

export async function POST(req: Request) {
  const { packageName, bookingData } = await req.json()

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: `https://danang-dentis.vercel.app/booking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `https://danang-dentis.vercel.app/booking/cancel`,
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
            unit_amount: PACKAGE_PRICES[packageName as keyof typeof PACKAGE_PRICES] * 100
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

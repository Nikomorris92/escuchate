import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const PRICE_ID = 'price_1U0RJdByMVzvBT6kq3q84wcs'

export async function POST(_request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: PRICE_ID, quantity: 1 }],
    success_url: `https://www.escuchateati.com/dashboard`,
    cancel_url: `https://www.escuchateati.com/quiz`,
    allow_promotion_codes: true,
  })

  return NextResponse.json({ url: session.url })
}

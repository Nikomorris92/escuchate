import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'

const PRICE_ID = 'price_1U0RJdByMVzvBT6kq3q84wcs'

export async function POST(request: NextRequest) {
  const { areaOrder, introText } = await request.json()

  // Salva dati quiz su Supabase
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('quiz_pending')
    .insert({ area_order: areaOrder, intro_text: introText ?? '' })
    .select('id')
    .single()

  if (error || !data) {
    return NextResponse.json({ error: 'Failed to save quiz data' }, { status: 500 })
  }

  // Crea Stripe Checkout Session
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: PRICE_ID, quantity: 1 }],
    success_url: `https://escuchateati.com/signup?payment=success&qid=${data.id}`,
    cancel_url: `https://escuchateati.com/quiz`,
    allow_promotion_codes: true,
  })

  return NextResponse.json({ url: session.url })
}

import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const ADMIN_EMAIL = 'nicola.morea92@gmail.com'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || user.email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const customersRes = await stripe.customers.list({ limit: 100 })

  const customers = await Promise.all(
    customersRes.data.map(async (c) => {
      const subsRes = await stripe.subscriptions.list({ customer: c.id, limit: 5 })
      const chargesRes = await stripe.charges.list({ customer: c.id, limit: 5 })

      const subscriptions = subsRes.data.map((sub) => ({
        id: sub.id,
        status: sub.status,
        amount: sub.items.data[0]?.price?.unit_amount ?? 0,
      }))

      const charges = chargesRes.data
        .filter((ch) => !ch.refunded && ch.paid)
        .map((ch) => ({
          id: ch.id,
          amount: ch.amount,
          refunded: ch.refunded,
          created: ch.created,
        }))

      return {
        id: c.id,
        email: c.email ?? '',
        name: c.name ?? '',
        subscriptions,
        charges,
      }
    })
  )

  return NextResponse.json({ customers })
}

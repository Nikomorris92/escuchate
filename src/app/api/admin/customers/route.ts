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

  const customersRes = await stripe.customers.list({ limit: 100, expand: ['data.subscriptions'] })

  const customers = await Promise.all(
    customersRes.data.map(async (c) => {
      const subs = (c.subscriptions as Stripe.ApiList<Stripe.Subscription>)?.data ?? []
      const subscriptions = await Promise.all(
        subs.map(async (sub) => {
          const invoice = sub.latest_invoice
            ? await stripe.invoices.retrieve(
                typeof sub.latest_invoice === 'string' ? sub.latest_invoice : sub.latest_invoice.id
              )
            : null
          return {
            id: sub.id,
            status: sub.status,
            amount: sub.items.data[0]?.price.unit_amount ?? 0,
            current_period_end: sub.current_period_end,
            latest_payment_intent: invoice?.payment_intent
              ? typeof invoice.payment_intent === 'string'
                ? invoice.payment_intent
                : invoice.payment_intent.id
              : null,
          }
        })
      )
      return {
        id: c.id,
        email: c.email ?? '',
        name: c.name ?? '',
        subscriptions,
      }
    })
  )

  return NextResponse.json({ customers })
}

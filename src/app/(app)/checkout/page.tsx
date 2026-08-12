'use client'

import { useEffect, useState } from 'react'

export default function CheckoutPage() {
  const [error, setError] = useState(false)

  useEffect(() => {
    async function startCheckout() {
      try {
        const res = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({}),
        })
        if (!res.ok) { setError(true); return }
        const { url } = await res.json()
        if (url) window.location.href = url
        else setError(true)
      } catch {
        setError(true)
      }
    }
    startCheckout()
  }, [])

  if (error) {
    return (
      <div className="page-container">
        <div className="card" style={{ textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '1rem' }}>
            Algo ha fallado. Por favor, inténtalo de nuevo.
          </p>
          <button className="btn-primary" onClick={() => window.location.href = '/quiz'}>
            Volver al test
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9375rem' }}>
        Preparando el pago…
      </p>
    </div>
  )
}

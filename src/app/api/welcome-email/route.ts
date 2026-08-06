import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { email } = await request.json()

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Escúchate <onboarding@resend.dev>',
      to: email,
      subject: '¡Bienvenido/a a Escúchate! 🌱',
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; background: #0f1923; color: #ffffff; border-radius: 12px;">
          <h1 style="font-size: 1.75rem; font-weight: 700; color: #ffffff; margin: 0 0 8px;">Escúchate</h1>
          <p style="font-size: 0.875rem; color: rgba(255,255,255,0.4); margin: 0 0 32px; font-style: italic;">
            "El genio es aquel que tiene la valentía y el coraje de escuchar su propio corazón." — John Demartini
          </p>

          <p style="font-size: 1rem; color: rgba(255,255,255,0.85); line-height: 1.7; margin: 0 0 16px;">
            Bienvenido/a a tu recorrido de crecimiento personal. Has dado el primer paso — y eso ya dice mucho de ti.
          </p>

          <p style="font-size: 1rem; color: rgba(255,255,255,0.85); line-height: 1.7; margin: 0 0 32px;">
            En Escúchate trabajarás 11 áreas de tu vida a través de reflexiones guiadas. No hay prisa. Ve a tu ritmo.
          </p>

          <a href="https://escuchateati.com/dashboard"
            style="display: inline-block; padding: 14px 28px; background: #ffffff; color: #1e3a5f; border-radius: 8px; font-weight: 700; font-size: 0.9375rem; text-decoration: none;">
            Ir a mi recorrido →
          </a>

          <p style="font-size: 0.8125rem; color: rgba(255,255,255,0.3); margin: 32px 0 0; line-height: 1.6;">
            Esta app no es un servicio médico ni terapéutico.<br/>
            Si estás siguiendo una terapia o tratamiento, sigue haciéndolo.<br/><br/>
            ¿Preguntas? Escríbenos a <a href="mailto:escuchateatimismo@gmail.com" style="color: rgba(255,255,255,0.5);">escuchateatimismo@gmail.com</a>
          </p>
        </div>
      `,
    }),
  })

  if (!res.ok) {
    return NextResponse.json({ error: 'Email failed' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}

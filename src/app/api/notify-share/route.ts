import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { reflectionText, area, sharedName } = await request.json()

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Escúchate <onboarding@resend.dev>',
      to: 'nicola.morea92@gmail.com',
      subject: '📝 Nueva reflexión compartida en el Muro',
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #1e3a5f;">Nueva reflexión en el Muro</h2>
          <p><strong>Área:</strong> ${area}</p>
          <p><strong>Nombre:</strong> ${sharedName || 'Anónimo'}</p>
          <blockquote style="border-left: 3px solid #c4783a; padding-left: 16px; color: #333; font-style: italic;">
            "${reflectionText}"
          </blockquote>
          <a href="https://escuchateati.com/admin" style="display: inline-block; margin-top: 16px; padding: 10px 20px; background: #1e3a5f; color: white; border-radius: 8px; text-decoration: none;">
            Ver en el Admin
          </a>
        </div>
      `,
    }),
  })

  if (!res.ok) {
    return NextResponse.json({ error: 'Email failed' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}

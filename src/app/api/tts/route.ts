import { NextRequest, NextResponse } from 'next/server'

const VOICE_ID = 'Ir1QNHvhaJXbAGhT50w3'

export async function POST(req: NextRequest) {
  const apiKey = process.env.ELEVENLABS_API_KEY
  if (!apiKey) return NextResponse.json({ error: 'TTS not configured' }, { status: 503 })

  const { text } = await req.json()
  if (!text || typeof text !== 'string') return NextResponse.json({ error: 'Missing text' }, { status: 400 })

  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
    method: 'POST',
    headers: {
      'xi-api-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: text.slice(0, 1000), // limite sicurezza
      model_id: 'eleven_multilingual_v2',
      voice_settings: { stability: 0.5, similarity_boost: 0.75 },
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    return NextResponse.json({ error: err }, { status: res.status })
  }

  const audio = await res.arrayBuffer()
  return new NextResponse(audio, {
    headers: {
      'Content-Type': 'audio/mpeg',
      'Cache-Control': 'public, max-age=86400', // cache 24h per non sprecare caratteri
    },
  })
}

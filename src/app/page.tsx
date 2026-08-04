import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="page-container" style={{ background: '#1e3a5f', minHeight: '100dvh' }}>
      <div style={{ width: '100%', maxWidth: '480px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: '700', letterSpacing: '-0.03em', marginBottom: '2rem', color: '#ffffff' }}>
          Escúchate
        </h1>

        <blockquote style={{
          margin: '0 0 2.5rem',
          padding: '1.5rem',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: '1.0625rem', color: 'rgba(255,255,255,0.85)', lineHeight: '1.75', fontStyle: 'italic', margin: '0 0 0.75rem' }}>
            "El genio es aquel que tiene la valentía y el coraje de escuchar su propio corazón."
          </p>
          <cite style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', fontStyle: 'normal', fontWeight: '500' }}>
            — John Demartini
          </cite>
        </blockquote>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <a href="https://buy.stripe.com/6oU00igJt65aegI0yN0Ny00" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '0.875rem 1.5rem', background: '#ffffff', color: '#1e3a5f',
            borderRadius: '0.75rem', fontWeight: '600', fontSize: '0.9375rem',
            textDecoration: 'none',
          }}>
            Empezar
          </a>
          <Link href="/login" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '0.625rem 1rem', color: 'rgba(255,255,255,0.6)',
            fontSize: '0.875rem', textDecoration: 'none',
          }}>
            Ya tengo cuenta
          </Link>
        </div>

        <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', textAlign: 'center', lineHeight: '1.5', marginTop: '2rem' }}>
          Esta app no es un servicio médico ni terapéutico.<br />
          Si estás siguiendo una terapia o tratamiento, sigue haciéndolo.
        </p>

        <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
          <p style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.375rem' }}>
            Contacto
          </p>
          <a href="mailto:escuchateatimismo@gmail.com" style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>
            escuchateatimismo@gmail.com
          </a>
        </div>
      </div>
    </div>
  )
}

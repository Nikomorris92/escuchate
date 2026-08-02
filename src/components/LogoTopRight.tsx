import Image from 'next/image'

export default function LogoTopRight() {
  return (
    <div style={{
      position: 'fixed',
      top: '0.75rem',
      right: '0.75rem',
      zIndex: 50,
    }}>
      <Image src="/logo.png" alt="Escúchate" width={52} height={52} style={{ objectFit: 'contain' }} />
    </div>
  )
}

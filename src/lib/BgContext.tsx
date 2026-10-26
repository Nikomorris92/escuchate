'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type BgEffect = 'none' | 'waves' | 'forest' | 'universe' | 'birds' | 'fog'

const BG_KEY = 'escuchate_bg'

interface BgContextType {
  bg: BgEffect
  setBg: (bg: BgEffect) => void
}

const BgContext = createContext<BgContextType>({ bg: 'none', setBg: () => {} })

export function BgProvider({ children }: { children: ReactNode }) {
  const [bg, setBgState] = useState<BgEffect>('none')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(BG_KEY) as BgEffect | null
      if (saved) setBgState(saved)
    } catch {}
  }, [])

  function setBg(next: BgEffect) {
    setBgState(next)
    try { localStorage.setItem(BG_KEY, next) } catch {}
  }

  return <BgContext.Provider value={{ bg, setBg }}>{children}</BgContext.Provider>
}

export function useBg() {
  return useContext(BgContext)
}

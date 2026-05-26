'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * TopBar — slim fixed announcement bar with infinite scrolling text.
 * Disappears smoothly on scroll.
 */
export default function TopBar() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const publishHeight = (h: number) =>
      document.documentElement.style.setProperty('--topbar-height', `${h}px`)

    const updateHeight = () => {
      publishHeight(visible ? (ref.current?.offsetHeight ?? 0) : 0)
    }

    updateHeight()
    window.addEventListener('resize', updateHeight)

    const onScroll = () => {
      const barH = ref.current?.offsetHeight ?? 32
      const shouldShow = window.scrollY < barH
      setVisible(shouldShow)
      publishHeight(shouldShow ? barH : 0)
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('resize', updateHeight)
      window.removeEventListener('scroll', onScroll)
    }
  }, [visible])

  const text = '🌿 Free shipping on orders over AED 200  |  contact@biovitalitylife.com  |  +971 50 185 9905'

  return (
    <div
      ref={ref}
      role="banner"
      className="fixed left-0 right-0 z-[60] overflow-hidden
                 text-white text-[11px]
                 transition-all duration-500 ease-in-out"
      style={{
        backgroundColor: '#084e46',
        top: 0,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        pointerEvents: visible ? 'auto' : 'none',
        height: '28px',
      }}
    >
      {/* Infinite scroll wrapper */}
      <div className="flex items-center h-full animate-marquee whitespace-nowrap">
        <span className="mx-8">{text}</span>
        <span className="mx-8">{text}</span>
        <span className="mx-8">{text}</span>
        <span className="mx-8">{text}</span>
      </div>
    </div>
  )
}

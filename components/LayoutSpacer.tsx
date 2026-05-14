'use client'

import { useEffect, useRef } from 'react'

/**
 * LayoutSpacer — renders an invisible div whose height equals
 * the combined height of the fixed TopBar + Navbar.
 * Place this as the first child of <main> on every page.
 *
 * The TopBar publishes --topbar-height on <html>.
 * The Navbar is ~72px tall (py-4 lg:py-5 + logo).
 * We measure the actual navbar height from the DOM for accuracy.
 */
export default function LayoutSpacer() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const update = () => {
      // Read topbar height from CSS variable
      const topbarH = parseFloat(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--topbar-height') || '0'
      )
      // Measure the navbar (first <header> in the document)
      const navbar = document.querySelector('header')
      const navbarH = navbar?.offsetHeight ?? 72
      if (ref.current) {
        ref.current.style.height = `${topbarH + navbarH}px`
      }
    }

    update()
    window.addEventListener('resize', update)

    // Re-run when --topbar-height changes (topbar dismissed)
    const observer = new MutationObserver(update)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style'],
    })

    return () => {
      window.removeEventListener('resize', update)
      observer.disconnect()
    }
  }, [])

  return <div ref={ref} aria-hidden="true" />
}

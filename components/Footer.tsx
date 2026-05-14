import Link from 'next/link'
import Image from 'next/image'

const navLinks = [
  { href: '/', label: 'HOME' },
  { href: '/about', label: 'ABOUT' },
  { href: '/shop', label: 'SHOP' },
  { href: '/contact', label: 'CONTACT' },
]

/**
 * Footer — logo, tagline, nav, copyright, social icons.
 */
export default function Footer() {
  return (
    <footer
      className="border-t border-gray-100 py-12 px-6"
      style={{ backgroundColor: 'var(--color-cream)' }}
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          {/* Logo + tagline */}
          <div className="flex flex-col items-center gap-2 md:items-start">
            <Image
              src="/BioVitality-logo-1.png"
              alt="BioVitality™ logo"
              width={120}
              height={36}
              className="h-9 w-auto object-contain"
            />
            <p className="text-sm text-[var(--color-muted)]">
              Pure Organic Prickly Pear Vinegar
            </p>
          </div>

          {/* Nav */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap justify-center gap-6 md:gap-8" role="list">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-xs font-bold tracking-widest text-[var(--color-muted)]
                               hover:text-[var(--color-primary)] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social icons */}
          <div className="flex gap-3" aria-label="Social media">
            {['Instagram', 'Facebook', 'TikTok'].map((platform) => (
              <a
                key={platform}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200
                           text-[var(--color-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]
                           transition-all"
                aria-label={`BioVitality on ${platform}`}
              >
                <span className="text-xs font-bold">{platform[0]}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-gray-200" />

        {/* Copyright */}
        <p className="text-center text-sm text-[var(--color-muted)]">
          © 2026 BioVitality™ – Pure Organic Prickly Pear Vinegar. Built with Love 🌿
        </p>
      </div>
    </footer>
  )
}

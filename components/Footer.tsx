import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/shop', label: 'Shop' },
  { href: '/contact', label: 'Contact' },
]

const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com/biovitalitylife', icon: 'IG' },
  { label: 'Facebook', href: 'https://facebook.com/biovitalitylife', icon: 'FB' },
  { label: 'TikTok', href: 'https://tiktok.com/@biovitalitylife', icon: 'TK' },
]

export default function Footer() {
  return (
    <footer
      className="pt-16 pb-8 px-6"
      style={{ backgroundColor: '#084e46' }}
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-6xl">
        {/* Top grid */}
        <div className="grid gap-10 md:grid-cols-3 lg:grid-cols-4 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Image
              src="/BioVitality-logo-1.png"
              alt="BioVitality™"
              width={130}
              height={40}
              className="h-10 w-auto object-contain mb-4"
            />
            <p className="text-white/60 text-sm leading-relaxed mb-5">
              Premium organic prickly pear vinegar from Tunisia. Raw, unfiltered, with the Mother.
            </p>
            {/* Social */}
            <div className="flex gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full
                             bg-white/10 text-white/70 text-xs font-bold
                             hover:bg-white/20 hover:text-white transition-all"
                  aria-label={`BioVitality on ${s.label}`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2.5" role="list">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-white/60 text-sm hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/sign-in" className="text-white/60 text-sm hover:text-white transition-colors">
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Our Services</h4>
            <ul className="space-y-2.5" role="list">
              <li><span className="text-white/60 text-sm">Pharma Line (Wellness)</span></li>
              <li><span className="text-white/60 text-sm">Food Line (Culinary)</span></li>
              <li><span className="text-white/60 text-sm">Private Label Solutions</span></li>
              <li><span className="text-white/60 text-sm">Bulk & Wholesale</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Contact Us</h4>
            <ul className="space-y-3" role="list">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="text-white/50 mt-0.5 shrink-0" />
                <span className="text-white/60 text-sm">Dubai, United Arab Emirates</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone size={15} className="text-white/50 mt-0.5 shrink-0" />
                <a href="tel:+971501859905" className="text-white/60 text-sm hover:text-white transition-colors">
                  +971 50 185 9905
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail size={15} className="text-white/50 mt-0.5 shrink-0" />
                <a href="mailto:contact@biovitalitylife.com" className="text-white/60 text-sm hover:text-white transition-colors">
                  contact@biovitalitylife.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-xs">
              © 2026 BioVitality™. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-white/40 text-xs hover:text-white/70 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-white/40 text-xs hover:text-white/70 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

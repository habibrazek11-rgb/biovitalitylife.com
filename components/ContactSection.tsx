'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Send, CheckCircle, MessageCircle, Clock } from 'lucide-react'

const contactInfo = [
  {
    icon: MapPin,
    label: 'Location',
    value: 'Dubai, United Arab Emirates',
    href: 'https://maps.google.com/?q=Dubai,UAE',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+971 50 185 9905',
    href: 'tel:+971501859905',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'contact@biovitalitylife.com',
    href: 'mailto:contact@biovitalitylife.com',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: 'Chat with us',
    href: 'https://wa.me/971501859905?text=Hello%20BioVitality!',
  },
  {
    icon: null,
    label: 'Instagram',
    value: '@biovitality_life',
    href: 'https://www.instagram.com/biovitality_life/',
  },
  {
    icon: Clock,
    label: 'Hours',
    value: 'Mon–Sat, 9am–6pm GST',
    href: null,
  },
]

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1000)
  }

  return (
    <section className="min-h-screen bg-white" aria-labelledby="contact-heading">
      {/* Hero banner */}
      <div className="bg-white pt-32 pb-16 px-6 text-center border-b border-gray-100">
        <motion.p
          className="mb-2 text-xs font-bold tracking-[0.3em] uppercase text-[var(--color-muted)]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Get in Touch
        </motion.p>
        <motion.h1
          id="contact-heading"
          className="font-heading text-4xl md:text-5xl font-bold text-[var(--color-dark)] mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          We'd Love to Hear From You
        </motion.h1>
        <motion.p
          className="text-[var(--color-muted)] text-base max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Questions, wholesale inquiries, or just want to say hello — we're here.
        </motion.p>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left — Contact info */}
          <motion.div
            className="lg:col-span-2 space-y-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-2xl font-bold text-[var(--color-dark)] mb-6">
              Contact Information
            </h2>

            {contactInfo.map((item) => {
              const Icon = item.icon
              const content = (
                <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-100 hover:border-[#084e46]/20 hover:shadow-sm transition-all group">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#084e46]/10 group-hover:bg-[#084e46] transition-colors">
                    {item.icon ? (
                      <item.icon size={18} className="text-[#084e46] group-hover:text-white transition-colors" />
                    ) : (
                      <span className="text-[#084e46] group-hover:text-white transition-colors"><InstagramIcon /></span>
                    )}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-muted)] mb-0.5">{item.label}</p>
                    <p className="text-sm font-medium text-[var(--color-dark)]">{item.value}</p>
                  </div>
                </div>
              )

              return item.href ? (
                <a key={item.label} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                  {content}
                </a>
              ) : (
                <div key={item.label}>{content}</div>
              )
            })}
          </motion.div>

          {/* Right — Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-8 md:p-10">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#084e46]/10"
                  >
                    <CheckCircle size={32} className="text-[#084e46]" />
                  </motion.div>
                  <h3 className="mb-2 font-heading text-2xl font-bold text-[var(--color-dark)]">
                    Message Sent!
                  </h3>
                  <p className="text-[var(--color-muted)] mb-6">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', subject: '', message: '' }) }}
                    className="text-sm font-semibold text-[#084e46] hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="font-heading text-2xl font-bold text-[var(--color-dark)] mb-6">
                    Send a Message
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[var(--color-dark)] mb-1.5 uppercase tracking-wider">Full Name</label>
                        <input
                          name="name"
                          type="text"
                          placeholder="Your name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#084e46] focus:ring-1 focus:ring-[#084e46] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[var(--color-dark)] mb-1.5 uppercase tracking-wider">Email</label>
                        <input
                          name="email"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#084e46] focus:ring-1 focus:ring-[#084e46] transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[var(--color-dark)] mb-1.5 uppercase tracking-wider">Subject</label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#084e46] focus:ring-1 focus:ring-[#084e46] transition-colors bg-white"
                      >
                        <option value="">Select a subject</option>
                        <option value="order">Order Inquiry</option>
                        <option value="wholesale">Wholesale / Bulk Order</option>
                        <option value="private-label">Private Label</option>
                        <option value="product">Product Question</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[var(--color-dark)] mb-1.5 uppercase tracking-wider">Message</label>
                      <textarea
                        name="message"
                        rows={5}
                        placeholder="How can we help you?"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none resize-none focus:border-[#084e46] focus:ring-1 focus:ring-[#084e46] transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="flex w-full items-center justify-center gap-2.5 rounded-xl py-4 text-sm font-bold text-white transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
                      style={{ backgroundColor: '#084e46' }}
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <>
                          <Send size={16} />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

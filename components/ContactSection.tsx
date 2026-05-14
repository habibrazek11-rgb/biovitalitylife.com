'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react'

/**
 * ContactSection — minimal, elegant contact form with info.
 */
export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: wire up to API route
    setSubmitted(true)
  }

  return (
    <section className="py-24 px-6" aria-labelledby="contact-heading" id="contact">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label mb-3" style={{ color: '#ca3b80' }}>Get in Touch</p>
          <h2 id="contact-heading" className="section-title mb-4">
            We&apos;d Love to Hear From You
          </h2>
          <p className="text-[var(--color-muted)] text-lg max-w-xl mx-auto">
            Have a question, feedback, or just want to say hello? Drop us a message.
          </p>
        </motion.div>

        {/* Contact info pills */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <a
            href="https://maps.google.com/?q=Dubai,UAE"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 rounded-full border border-gray-200 bg-white
                       px-5 py-3 text-sm text-[var(--color-dark)] hover:border-[#084e46]/30
                       hover:shadow-md transition-all duration-300"
          >
            <MapPin size={16} style={{ color: '#084e46' }} />
            Dubai, UAE
          </a>
          <a
            href="tel:+971501859905"
            className="flex items-center gap-2.5 rounded-full border border-gray-200 bg-white
                       px-5 py-3 text-sm text-[var(--color-dark)] hover:border-[#084e46]/30
                       hover:shadow-md transition-all duration-300"
          >
            <Phone size={16} style={{ color: '#084e46' }} />
            +971 50 185 9905
          </a>
          <a
            href="mailto:contact@biovitalitylife.com"
            className="flex items-center gap-2.5 rounded-full border border-gray-200 bg-white
                       px-5 py-3 text-sm text-[var(--color-dark)] hover:border-[#084e46]/30
                       hover:shadow-md transition-all duration-300"
          >
            <Mail size={16} style={{ color: '#084e46' }} />
            contact@biovitalitylife.com
          </a>
        </motion.div>

        {/* Form */}
        <motion.div
          className="mx-auto max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div
                className="mb-5 flex h-16 w-16 items-center justify-center rounded-full"
                style={{ backgroundColor: 'rgba(8,78,70,0.1)' }}
              >
                <CheckCircle size={32} style={{ color: '#084e46' }} />
              </div>
              <h3 className="mb-2 font-heading text-2xl font-bold text-[var(--color-dark)]">
                Message Sent!
              </h3>
              <p className="text-[var(--color-muted)]">
                Thank you for reaching out. We&apos;ll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate aria-label="Contact form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-200 px-5 py-3.5 text-sm
                               text-[var(--color-dark)] placeholder-gray-400 outline-none
                               focus:border-[#084e46] focus:ring-1 focus:ring-[#084e46]
                               transition-colors"
                  />
                </div>
                <div>
                  <input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-200 px-5 py-3.5 text-sm
                               text-[var(--color-dark)] placeholder-gray-400 outline-none
                               focus:border-[#084e46] focus:ring-1 focus:ring-[#084e46]
                               transition-colors"
                  />
                </div>
              </div>

              <div>
                <input
                  name="subject"
                  type="text"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-200 px-5 py-3.5 text-sm
                             text-[var(--color-dark)] placeholder-gray-400 outline-none
                             focus:border-[#084e46] focus:ring-1 focus:ring-[#084e46]
                             transition-colors"
                />
              </div>

              <div>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Your message..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-200 px-5 py-3.5 text-sm
                             text-[var(--color-dark)] placeholder-gray-400 outline-none resize-none
                             focus:border-[#084e46] focus:ring-1 focus:ring-[#084e46]
                             transition-colors"
                />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2.5 rounded-xl py-4
                           text-sm font-bold text-white transition-all
                           hover:opacity-90 active:scale-[0.98]"
                style={{ backgroundColor: '#084e46' }}
              >
                <Send size={16} />
                Send Message
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}

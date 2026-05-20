'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Tag, FlaskConical, CheckCircle, Globe, MessageCircle, Palette, Factory, Truck } from 'lucide-react'

const solutions = [
  {
    icon: Tag,
    title: 'Your Brand, Your Vision',
    description: 'We bring your ideas to life with custom formulations and unique labels.',
  },
  {
    icon: FlaskConical,
    title: 'Premium Quality',
    description: 'Made with carefully selected organic prickly pear for maximum purity and effectiveness.',
  },
  {
    icon: CheckCircle,
    title: 'Full Service Support',
    description: 'From concept and design to production and packaging — we handle it all.',
  },
  {
    icon: Globe,
    title: 'Global Standards',
    description: 'Manufactured under strict quality control with international certifications.',
  },
]

const steps = [
  { icon: MessageCircle, number: '1', title: 'Consultation', description: 'Share your vision and requirements with our team.' },
  { icon: Palette, number: '2', title: 'Design & Formulation', description: 'We create custom formulations and label designs.' },
  { icon: Factory, number: '3', title: 'Production', description: 'High-quality manufacturing with strict quality control.' },
  { icon: Truck, number: '4', title: 'Delivery', description: 'Your product, ready to reach the world.' },
]

export default function PrivateLabel() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1])
  const imageRotate = useTransform(scrollYProgress, [0, 1], [-2, 2])

  return (
    <section ref={sectionRef} className="py-24 px-6 overflow-hidden" aria-labelledby="private-label-heading">
      <div className="mx-auto max-w-6xl">
        {/* Top section — text + image */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <p className="section-label mb-3" style={{ color: '#ca3b80' }}>Private Label</p>
            <h2 id="private-label-heading" className="font-heading text-4xl md:text-5xl font-bold text-[var(--color-dark)] leading-tight mb-4">
              Create Your Own
              <br />
              Mark of{' '}
              <span style={{ color: '#084e46' }}>Vinegar</span>
            </h2>
            <p className="text-lg text-[var(--color-muted)] mb-8">
              Private Label, Your Brand, Our Expertise. Build your own organic prickly pear vinegar brand with BioVitality™ as your trusted manufacturing partner.
            </p>

            {/* Solutions list */}
            <div className="space-y-5">
              {solutions.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="flex items-start gap-4">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: 'rgba(8,78,70,0.08)' }}
                    >
                      <Icon size={18} style={{ color: '#084e46' }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-[var(--color-dark)] text-sm mb-0.5">{item.title}</h3>
                      <p className="text-sm text-[var(--color-muted)] leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Right — image with scroll animation */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              style={{ scale: imageScale, rotate: imageRotate }}
            >
              <Image
                src="/private-label-vinegar.png"
                alt="BioVitality Private Label — Your Brand, Our Expertise"
                width={600}
                height={600}
                className="w-full h-auto object-contain"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* How it works — 4 steps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-center font-heading text-2xl font-bold text-[var(--color-dark)] mb-12">
            How It Works
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <div key={step.number} className="relative text-center">
                  {/* Connector line */}
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-6 left-[60%] w-[80%] h-[1px] bg-gray-200" aria-hidden="true" />
                  )}

                  <div
                    className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full"
                    style={{ backgroundColor: '#084e46' }}
                  >
                    <Icon size={20} className="text-white" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-1">
                    Step {step.number}
                  </p>
                  <h4 className="font-bold text-sm text-[var(--color-dark)] mb-1">{step.title}</h4>
                  <p className="text-xs text-[var(--color-muted)] leading-relaxed">{step.description}</p>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* CTA banner */}
        <motion.div
          className="mt-16 rounded-2xl p-8 md:p-10 text-center"
          style={{ backgroundColor: '#084e46' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">
            Build Your Brand. Inspire Health. Make Your Mark.
          </h3>
          <p className="text-white/70 text-sm mb-6 max-w-lg mx-auto">
            Partner with BioVitality™ to create your own premium organic prickly pear vinegar brand.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold
                       transition-all hover:opacity-90 active:scale-[0.98]"
            style={{ color: '#084e46' }}
          >
            <MessageCircle size={16} />
            Get in Touch
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

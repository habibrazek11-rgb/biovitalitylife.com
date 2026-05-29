import type { Metadata } from 'next'
import TopBar from '@/components/TopBar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy – BioVitality™',
  description: 'Learn how BioVitality™ collects, uses, and protects your personal information.',
}

export default function PrivacyPage() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main id="main-content" className="pt-32 pb-20 px-6 bg-white">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-[var(--color-muted)] mb-2">Legal</p>
          <h1 className="font-heading text-4xl font-bold text-[var(--color-dark)] mb-2">Privacy Policy</h1>
          <p className="text-sm text-[var(--color-muted)] mb-10">Last updated: May 29, 2026</p>

          <div className="prose prose-sm max-w-none space-y-8 text-[var(--color-dark)]/80 leading-relaxed">

            <section>
              <h2 className="font-heading text-xl font-bold text-[var(--color-dark)] mb-3">1. Introduction</h2>
              <p>BioVitality™ ("we", "our", or "us") is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website biovitalitylife.com or make a purchase from us.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-bold text-[var(--color-dark)] mb-3">2. Information We Collect</h2>
              <p className="mb-3">We may collect the following types of information:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Personal identification information:</strong> Name, email address, phone number, shipping address, and billing address when you place an order or create an account.</li>
                <li><strong>Payment information:</strong> We do not store your full payment card details. Payments are processed securely through third-party payment processors.</li>
                <li><strong>Usage data:</strong> IP address, browser type, pages visited, time spent on pages, and referring URLs collected automatically when you visit our website.</li>
                <li><strong>Communications:</strong> Messages you send us via contact forms, email, or WhatsApp.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-bold text-[var(--color-dark)] mb-3">3. How We Use Your Information</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>To process and fulfill your orders</li>
                <li>To send order confirmations and shipping updates</li>
                <li>To respond to your inquiries and provide customer support</li>
                <li>To send promotional emails and newsletters (with your consent)</li>
                <li>To improve our website and product offerings</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-bold text-[var(--color-dark)] mb-3">4. Sharing Your Information</h2>
              <p className="mb-3">We do not sell, trade, or rent your personal information to third parties. We may share your information with:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Service providers:</strong> Shipping carriers, payment processors, and email service providers who assist in operating our business.</li>
                <li><strong>Legal requirements:</strong> When required by law or to protect our rights and safety.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-bold text-[var(--color-dark)] mb-3">5. Cookies</h2>
              <p>We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and personalize content. You can control cookie settings through your browser preferences.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-bold text-[var(--color-dark)] mb-3">6. Data Security</h2>
              <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-bold text-[var(--color-dark)] mb-3">7. Your Rights</h2>
              <p className="mb-3">You have the right to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your personal data</li>
                <li>Opt out of marketing communications at any time</li>
                <li>Lodge a complaint with a data protection authority</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-bold text-[var(--color-dark)] mb-3">8. Third-Party Links</h2>
              <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices of those sites and encourage you to review their privacy policies.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-bold text-[var(--color-dark)] mb-3">9. Children's Privacy</h2>
              <p>Our website is not directed to children under the age of 13. We do not knowingly collect personal information from children.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-bold text-[var(--color-dark)] mb-3">10. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us:</p>
              <div className="mt-3 p-4 rounded-xl bg-[#f9f6f1]">
                <p><strong>BioVitality™</strong></p>
                <p>Dubai, United Arab Emirates</p>
                <p>Email: <a href="mailto:contact@biovitalitylife.com" className="text-[#084e46] hover:underline">contact@biovitalitylife.com</a></p>
                <p>Phone: <a href="tel:+971501859905" className="text-[#084e46] hover:underline">+971 50 185 9905</a></p>
              </div>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

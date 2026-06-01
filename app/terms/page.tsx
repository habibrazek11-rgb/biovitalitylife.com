import type { Metadata } from 'next'
import TopBar from '@/components/TopBar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Terms of Service – BioVitality™',
  description: 'Read the Terms of Service for BioVitality™ — your rights and obligations when using our website and purchasing our products.',
}

export default function TermsPage() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main id="main-content" className="pt-32 pb-20 px-6 bg-white">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-[var(--color-muted)] mb-2">Legal</p>
          <h1 className="font-heading text-4xl font-bold text-[var(--color-dark)] mb-2">Terms of Service</h1>
          <p className="text-sm text-[var(--color-muted)] mb-10">Last updated: May 29, 2026</p>

          <div className="prose prose-sm max-w-none space-y-8 text-[var(--color-dark)]/80 leading-relaxed">

            <section>
              <h2 className="font-heading text-xl font-bold text-[var(--color-dark)] mb-3">1. Acceptance of Terms</h2>
              <p>By accessing or using the BioVitality™ website (biovitalitylife.com) or purchasing our products, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-bold text-[var(--color-dark)] mb-3">2. Products and Pricing</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>All prices are listed in UAE Dirhams (AED) and include VAT where applicable.</li>
                <li>We reserve the right to modify prices at any time without prior notice.</li>
                <li>Product images are for illustrative purposes and may vary slightly from the actual product.</li>
                <li>We reserve the right to limit quantities or refuse orders at our discretion.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-bold text-[var(--color-dark)] mb-3">3. Orders and Payment</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>By placing an order, you confirm that all information provided is accurate and complete.</li>
                <li>We accept major credit/debit cards and other payment methods as displayed at checkout.</li>
                <li>Your order is confirmed once payment is successfully processed and you receive a confirmation email.</li>
                <li>We reserve the right to cancel orders in cases of pricing errors, stock unavailability, or suspected fraud.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-bold text-[var(--color-dark)] mb-3">4. Shipping and Delivery</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>We offer free shipping on orders over AED 300 within the UAE.</li>
                <li>Delivery times are estimates and may vary due to factors outside our control.</li>
                <li>Risk of loss and title for products pass to you upon delivery.</li>
                <li>We are not responsible for delays caused by customs, weather, or carrier issues.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-bold text-[var(--color-dark)] mb-3">5. Returns and Refunds</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>We accept returns within 15 days of delivery for unopened, undamaged products.</li>
                <li>To initiate a return, contact us at contact@biovitalitylife.com with your order number.</li>
                <li>Refunds will be processed within 7–10 business days after we receive the returned item.</li>
                <li>Shipping costs for returns are the responsibility of the customer unless the product is defective.</li>
                <li>We do not accept returns on opened food or health products for hygiene reasons.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-bold text-[var(--color-dark)] mb-3">6. Health Disclaimer</h2>
              <p>BioVitality™ products are food supplements and are not intended to diagnose, treat, cure, or prevent any disease. The information on our website is for educational purposes only and is not a substitute for professional medical advice. Consult your healthcare provider before using our products if you are pregnant, nursing, or have a medical condition.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-bold text-[var(--color-dark)] mb-3">7. Intellectual Property</h2>
              <p>All content on this website, including text, images, logos, and graphics, is the property of BioVitality™ and is protected by applicable intellectual property laws. You may not reproduce, distribute, or use our content without prior written permission.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-bold text-[var(--color-dark)] mb-3">8. User Accounts</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                <li>You agree to notify us immediately of any unauthorized use of your account.</li>
                <li>We reserve the right to terminate accounts that violate these terms.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-bold text-[var(--color-dark)] mb-3">9. Limitation of Liability</h2>
              <p>To the maximum extent permitted by law, BioVitality™ shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or products. Our total liability shall not exceed the amount paid for the specific product giving rise to the claim.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-bold text-[var(--color-dark)] mb-3">10. Governing Law</h2>
              <p>These Terms of Service are governed by the laws of the United Arab Emirates. Any disputes shall be subject to the exclusive jurisdiction of the courts of Dubai, UAE.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-bold text-[var(--color-dark)] mb-3">11. Changes to Terms</h2>
              <p>We reserve the right to update these Terms of Service at any time. Changes will be posted on this page with an updated date. Continued use of our website after changes constitutes acceptance of the new terms.</p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-bold text-[var(--color-dark)] mb-3">12. Contact Us</h2>
              <p>For questions about these Terms of Service, please contact us:</p>
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

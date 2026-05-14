import Image from 'next/image'
import Link from 'next/link'
import { SignUp } from '@clerk/nextjs'
import TopBar from '@/components/TopBar'
import Navbar from '@/components/Navbar'
import ToastProvider from '@/components/ui/ToastProvider'

export default function SignUpPage() {
  return (
    <ToastProvider>
      <TopBar />
      <Navbar />
      <main className="min-h-screen pt-32 pb-16 px-4 md:pt-36">
        <div className="mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-2 overflow-hidden rounded-none lg:rounded-2xl border-0 lg:border border-gray-100 shadow-none lg:shadow-sm">
            {/* Left — Image (desktop only) */}
            <div className="hidden lg:block relative">
              <Image
                src="/biovitality-auth-img.jpeg"
                alt="BioVitality organic prickly pear"
                fill
                sizes="50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-white text-2xl font-heading font-bold leading-snug">
                  Start your wellness
                  <br />
                  journey today.
                </p>
                <p className="mt-2 text-white/70 text-sm">
                  Organic prickly pear vinegar — from Tunisia to your home.
                </p>
              </div>
            </div>

            {/* Right — Sign Up form */}
            <div className="bg-white p-6 md:p-12 flex flex-col justify-center items-center lg:items-start">
              <Link href="/" className="mb-8 inline-block">
                <Image
                  src="/BioVitality-logo-1.png"
                  alt="BioVitality™"
                  width={130}
                  height={40}
                  className="h-9 w-auto"
                />
              </Link>

              <h1 className="font-heading text-2xl font-bold text-[var(--color-dark)] mb-1">
                Create your account
              </h1>
              <p className="text-sm text-[var(--color-muted)] mb-8">
                Join BioVitality™ for a healthier lifestyle
              </p>

              <SignUp
                appearance={{
                  elements: {
                    rootBox: 'w-full',
                    card: 'shadow-none border-none p-0 bg-transparent w-full',
                    headerTitle: 'hidden',
                    headerSubtitle: 'hidden',
                    footer: 'hidden',
                    footerAction: 'hidden',
                    footerPages: 'hidden',
                    badge: 'hidden',
                    formButtonPrimary:
                      'bg-[#084e46] hover:bg-[#063b35] text-white rounded-xl font-bold text-sm py-3.5 w-full transition-all',
                    formFieldInput:
                      'rounded-xl border-gray-200 text-sm py-3.5 px-4 focus:border-[#084e46] focus:ring-1 focus:ring-[#084e46] w-full',
                    formFieldLabel: 'text-sm font-semibold text-[#1A1A1A] mb-1.5',
                    socialButtonsBlockButton:
                      'border-gray-200 text-[#1A1A1A] font-medium rounded-xl hover:bg-gray-50 py-3',
                    dividerLine: 'bg-gray-200',
                    dividerText: 'text-[#6B7B5E] text-xs',
                    formFieldInputShowPasswordButton: 'text-gray-400 hover:text-gray-600',
                    internal: 'hidden',
                  },
                  layout: {
                    socialButtonsPlacement: 'top',
                    socialButtonsVariant: 'blockButton',
                  },
                }}
              />

              <p className="mt-8 text-center text-sm text-[var(--color-muted)]">
                Already have an account?{' '}
                <Link
                  href="/sign-in"
                  className="font-semibold hover:underline"
                  style={{ color: '#084e46' }}
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </ToastProvider>
  )
}

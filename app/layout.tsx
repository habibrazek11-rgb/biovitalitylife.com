import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter, Playfair_Display } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

/* ─── Fonts ──────────────────────────────────────────────────────────────── */
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

/* ─── Root Metadata ──────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL('https://biovitalitylife.com'),
  title: {
    default: 'BioVitality™ – Pure Organic Prickly Pear Vinegar',
    template: '%s | BioVitality™',
  },
  description:
    'BioVitality™ crafts premium organic prickly pear vinegar from the heart of Tunisia. Raw, unfiltered, with the Mother. For detox, gut health and Mediterranean cuisine.',
  keywords: [
    'organic prickly pear vinegar',
    'Tunisian vinegar',
    'gut health',
    'detox',
    'BioVitality',
    'UAE wellness',
    'natural vinegar',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    url: 'https://biovitalitylife.com',
    siteName: 'BioVitality™',
    title: 'BioVitality™ – Pure Organic Prickly Pear Vinegar',
    description:
      'Premium organic prickly pear vinegar from Tunisia. Raw, unfiltered, with the Mother.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BioVitality™ Organic Prickly Pear Vinegar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BioVitality™ – Pure Organic Prickly Pear Vinegar',
    description: 'Premium organic prickly pear vinegar from Tunisia.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <head>
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "ws2g9wakqi");
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ClerkProvider>
          {children}
        </ClerkProvider>
      </body>
    </html>
  )
}

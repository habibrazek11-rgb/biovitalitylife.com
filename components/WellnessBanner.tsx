'use client'

import Image from 'next/image'

export default function WellnessBanner() {
  return (
    <div className="w-full md:hidden">
      <div className="relative w-full">
        <Image
          src="/seeparator/welness%20BIO.png"
          alt="BioVitality Wellness"
          width={1080}
          height={1080}
          sizes="100vw"
          className="w-full h-auto"
        />
      </div>
    </div>
  )
}

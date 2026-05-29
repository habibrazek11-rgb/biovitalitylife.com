'use client'

import Image from 'next/image'

export default function Separator() {
  return (
    <>
      {/* Desktop: image separator */}
      <div className="hidden md:block w-full">
        <Image
          src="/seeparator/Whole%20Body%20Wellness%20Support.jpg"
          alt="Whole Body Wellness Support"
          width={1920}
          height={400}
          sizes="100vw"
          className="w-full h-auto"
        />
      </div>

      {/* Mobile: green band */}
      <div className="md:hidden py-8 px-6 bg-[#084e46]">
        <p className="text-sm font-bold tracking-[0.25em] uppercase text-white text-center">
          Organic · Raw · Unfiltered
        </p>
      </div>
    </>
  )
}

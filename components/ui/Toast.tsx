'use client'

import { useEffect, useState } from 'react'
import { CheckCircle, X } from 'lucide-react'

interface ToastProps {
  message: string
  onClose: () => void
}

export default function Toast({ message, onClose }: ToastProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(onClose, 300)
    }, 2500)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
      className={`fixed bottom-6 right-6 z-[200] flex items-center gap-3 rounded-lg px-5 py-3.5 shadow-xl
        bg-[var(--color-primary)] text-white text-sm font-medium
        transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      role="alert"
      aria-live="polite"
    >
      <CheckCircle size={18} className="shrink-0" />
      <span>{message}</span>
      <button
        onClick={() => { setVisible(false); setTimeout(onClose, 300) }}
        className="ml-2 opacity-70 hover:opacity-100 transition-opacity"
        aria-label="Dismiss notification"
      >
        <X size={16} />
      </button>
    </div>
  )
}

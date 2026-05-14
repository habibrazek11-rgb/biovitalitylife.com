'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  MessageSquare,
  Settings,
  Menu,
  X,
  LogOut,
  ChevronRight,
  FolderOpen,
} from 'lucide-react'
import { useClerk } from '@clerk/nextjs'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/categories', label: 'Categories', icon: FolderOpen },
  { href: '/admin/customers', label: 'Customers', icon: Users },
  { href: '/admin/messages', label: 'Messages', icon: MessageSquare },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { signOut } = useClerk()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50/50">
      {/* ── Sidebar (desktop) ── */}
      <aside className="hidden lg:flex lg:w-[260px] lg:flex-col lg:fixed lg:inset-y-0 bg-white border-r border-gray-100">
        {/* Logo */}
        <div className="flex h-[72px] items-center px-6 border-b border-gray-100">
          <Link href="/admin" className="flex items-center gap-3">
            <Image
              src="/BioVitality-logo-1.png"
              alt="BioVitality™"
              width={130}
              height={40}
              className="h-9 w-auto object-contain"
            />
          </Link>
          <span className="ml-2 rounded-md px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white"
                style={{ backgroundColor: '#084e46' }}>
            Admin
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all
                  ${isActive
                    ? 'bg-[#084e46] text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-[var(--color-dark)]'
                  }`}
              >
                <Icon size={18} strokeWidth={1.8} />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-gray-100">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm text-gray-500 hover:text-[var(--color-dark)] hover:bg-gray-50 transition-all"
          >
            <ChevronRight size={16} className="rotate-180" />
            Back to Store
          </Link>
          <button
            onClick={() => signOut()}
            className="flex w-full items-center gap-2 rounded-xl px-4 py-2.5 text-sm text-gray-500 hover:text-red-500 hover:bg-red-50 transition-all mt-1"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Mobile header ── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 flex h-14 items-center justify-between bg-white border-b border-gray-100 px-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-gray-600 hover:text-[var(--color-dark)]"
            aria-label="Open sidebar"
          >
            <Menu size={20} />
          </button>
          <Image
            src="/BioVitality-logo-1.png"
            alt="BioVitality™"
            width={100}
            height={30}
            className="h-7 w-auto object-contain"
          />
          <span className="rounded-md px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white"
                style={{ backgroundColor: '#084e46' }}>
            Admin
          </span>
        </div>
      </div>

      {/* ── Mobile sidebar overlay ── */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Mobile sidebar ── */}
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-[260px] bg-white border-r border-gray-100
          transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex h-14 items-center justify-between px-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Image
              src="/BioVitality-logo-1.png"
              alt="BioVitality™"
              width={100}
              height={30}
              className="h-7 w-auto object-contain"
            />
            <span className="rounded-md px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white"
                  style={{ backgroundColor: '#084e46' }}>
              Admin
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 text-gray-400 hover:text-gray-600"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>
        <nav className="px-3 py-5 space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all
                  ${isActive
                    ? 'bg-[#084e46] text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-[var(--color-dark)]'
                  }`}
              >
                <Icon size={18} strokeWidth={1.8} />
                {label}
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* ── Main content ── */}
      <main className="flex-1 lg:pl-[260px] overflow-y-auto">
        <div className="pt-14 lg:pt-0">
          {children}
        </div>
      </main>
    </div>
  )
}

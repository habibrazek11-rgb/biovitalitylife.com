import { prisma } from '@/lib/db'
import {
  ShoppingCart,
  Users,
  DollarSign,
  Package,
  TrendingUp,
  MessageSquare,
  ArrowUpRight,
} from 'lucide-react'
import Link from 'next/link'

async function getStats() {
  try {
    const [orderCount, customerCount, messageCount, orders] = await Promise.all([
      prisma.order.count(),
      prisma.user.count({ where: { role: 'CUSTOMER' } }),
      prisma.contactSubmission.count(),
      prisma.order.findMany({
        select: { total: true, status: true },
      }),
    ])

    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0)
    const pendingOrders = orders.filter((o) => o.status === 'PENDING').length

    return { orderCount, customerCount, messageCount, totalRevenue, pendingOrders }
  } catch {
    return { orderCount: 0, customerCount: 0, messageCount: 0, totalRevenue: 0, pendingOrders: 0 }
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  const cards = [
    {
      label: 'Total Revenue',
      value: `AED ${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: '#084e46',
      bg: 'rgba(8,78,70,0.08)',
      href: '/admin/orders',
    },
    {
      label: 'Total Orders',
      value: stats.orderCount.toString(),
      icon: ShoppingCart,
      color: '#2563eb',
      bg: 'rgba(37,99,235,0.08)',
      href: '/admin/orders',
    },
    {
      label: 'Pending',
      value: stats.pendingOrders.toString(),
      icon: Package,
      color: '#d97706',
      bg: 'rgba(217,119,6,0.08)',
      href: '/admin/orders',
    },
    {
      label: 'Customers',
      value: stats.customerCount.toString(),
      icon: Users,
      color: '#7c3aed',
      bg: 'rgba(124,58,237,0.08)',
      href: '/admin/customers',
    },
    {
      label: 'Messages',
      value: stats.messageCount.toString(),
      icon: MessageSquare,
      color: '#ca3b80',
      bg: 'rgba(202,59,128,0.08)',
      href: '/admin/messages',
    },
    {
      label: 'Conversion',
      value: stats.customerCount > 0
        ? `${Math.round((stats.orderCount / stats.customerCount) * 100)}%`
        : '0%',
      icon: TrendingUp,
      color: '#0891b2',
      bg: 'rgba(8,145,178,0.08)',
      href: '/admin/orders',
    },
  ]

  return (
    <div className="p-6 lg:p-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome back. Here&apos;s what&apos;s happening with your store.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <Link
              key={card.label}
              href={card.href}
              className="group rounded-2xl bg-white border border-gray-100 p-5 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ backgroundColor: card.bg }}
                >
                  <Icon size={18} style={{ color: card.color }} />
                </div>
                <ArrowUpRight
                  size={16}
                  className="text-gray-300 group-hover:text-gray-500 transition-colors"
                />
              </div>
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              <p className="mt-1 text-xs font-medium text-gray-500 uppercase tracking-wider">
                {card.label}
              </p>
            </Link>
          )
        })}
      </div>

      {/* Quick actions */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Link
          href="/admin/products"
          className="flex items-center gap-3 rounded-2xl bg-white border border-gray-100 p-5 hover:shadow-md transition-all"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: 'rgba(8,78,70,0.08)' }}>
            <Package size={18} style={{ color: '#084e46' }} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">Add Product</p>
            <p className="text-xs text-gray-500">Create new listing</p>
          </div>
        </Link>
        <Link
          href="/admin/categories"
          className="flex items-center gap-3 rounded-2xl bg-white border border-gray-100 p-5 hover:shadow-md transition-all"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: 'rgba(202,59,128,0.08)' }}>
            <Package size={18} style={{ color: '#ca3b80' }} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">Add Category</p>
            <p className="text-xs text-gray-500">Organize products</p>
          </div>
        </Link>
        <Link
          href="/admin/messages"
          className="flex items-center gap-3 rounded-2xl bg-white border border-gray-100 p-5 hover:shadow-md transition-all"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: 'rgba(37,99,235,0.08)' }}>
            <MessageSquare size={18} style={{ color: '#2563eb' }} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">View Messages</p>
            <p className="text-xs text-gray-500">Customer inquiries</p>
          </div>
        </Link>
      </div>

      {/* Recent orders */}
      <div className="mt-8 rounded-2xl bg-white border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-heading font-bold text-gray-900">Recent Orders</h2>
          <Link href="/admin/orders" className="text-xs font-semibold hover:underline" style={{ color: '#084e46' }}>
            View all →
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <ShoppingCart size={36} className="mb-3 text-gray-200" />
          <p className="text-sm text-gray-500">
            Orders will appear here once customers start placing them.
          </p>
        </div>
      </div>
    </div>
  )
}

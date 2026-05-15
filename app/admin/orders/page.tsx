import { prisma } from '@/lib/db'
import Link from 'next/link'
import { Package } from 'lucide-react'

const statusColors: Record<string, string> = {
  PENDING: 'bg-amber-100 text-amber-700',
  CONFIRMED: 'bg-blue-100 text-blue-700',
  PROCESSING: 'bg-indigo-100 text-indigo-700',
  SHIPPED: 'bg-purple-100 text-purple-700',
  DELIVERED: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-red-100 text-red-700',
}

export default async function AdminOrdersPage() {
  const orders = (await prisma.order.findMany({
    include: {
      user: { select: { firstName: true, lastName: true, email: true } },
      items: true,
    },
    orderBy: { createdAt: 'desc' },
    take: 50,
  })) as any[]

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and track customer orders
          </p>
        </div>
        <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-600">
          {orders.length} total
        </span>
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl bg-white border border-gray-100 py-20 text-center shadow-sm">
          <Package size={48} className="mb-4 text-gray-200" />
          <h2 className="mb-2 text-lg font-bold text-gray-900">No orders yet</h2>
          <p className="text-sm text-gray-500">
            Orders will appear here when customers make purchases.
          </p>
        </div>
      ) : (
        <div className="rounded-xl bg-white border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">Order ID</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">Customer</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">Items</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">Total</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">Status</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">Date</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-gray-500">
                      {order.id.slice(0, 8)}...
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">
                        {order.user.firstName} {order.user.lastName}
                      </p>
                      <p className="text-xs text-gray-500">{order.user.email}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                    </td>
                    <td className="px-4 py-3 font-semibold text-gray-900">
                      {order.currency} {order.total}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${statusColors[order.status] || 'bg-gray-100 text-gray-600'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="text-xs font-semibold text-[var(--color-primary)] hover:text-[var(--color-accent)]"
                      >
                        View →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

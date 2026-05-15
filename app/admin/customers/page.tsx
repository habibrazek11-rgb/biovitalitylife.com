import { prisma } from '@/lib/db'
import { Users } from 'lucide-react'

interface Customer {
  id: string
  email: string
  firstName: string | null
  lastName: string | null
  role: string
  createdAt: Date
  _count: { orders: number }
}

export default async function AdminCustomersPage() {
  const customers = await prisma.user.findMany({
    include: {
      _count: { select: { orders: true } },
    },
    orderBy: { createdAt: 'desc' },
    take: 50,
  }) as Customer[]

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="mt-1 text-sm text-gray-500">
            View and manage registered users
          </p>
        </div>
        <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-600">
          {customers.length} total
        </span>
      </div>

      {customers.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl bg-white border border-gray-100 py-20 text-center shadow-sm">
          <Users size={48} className="mb-4 text-gray-200" />
          <h2 className="mb-2 text-lg font-bold text-gray-900">No customers yet</h2>
          <p className="text-sm text-gray-500">
            Customers will appear here once they sign up.
          </p>
        </div>
      ) : (
        <div className="rounded-xl bg-white border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">Customer</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">Email</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">Role</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">Orders</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-9 w-9 items-center justify-center rounded-full text-white text-xs font-bold"
                          style={{ backgroundColor: 'var(--color-primary)' }}
                        >
                          {customer.firstName?.[0] || customer.email[0].toUpperCase()}
                        </div>
                        <p className="font-medium text-gray-900">
                          {customer.firstName} {customer.lastName}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{customer.email}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${
                          customer.role === 'ADMIN'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {customer.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{customer._count.orders}</td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(customer.createdAt).toLocaleDateString()}
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

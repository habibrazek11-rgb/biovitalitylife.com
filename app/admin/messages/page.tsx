import { prisma } from '@/lib/db'
import { MessageSquare, Mail } from 'lucide-react'

export default async function AdminMessagesPage() {
  const messages = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
  })

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <p className="mt-1 text-sm text-gray-500">
            Contact form submissions from customers
          </p>
        </div>
        <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-600">
          {messages.length} total
        </span>
      </div>

      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl bg-white border border-gray-100 py-20 text-center shadow-sm">
          <MessageSquare size={48} className="mb-4 text-gray-200" />
          <h2 className="mb-2 text-lg font-bold text-gray-900">No messages yet</h2>
          <p className="text-sm text-gray-500">
            Messages from the contact form will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="rounded-xl bg-white border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-50">
                    <Mail size={18} className="text-rose-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-gray-900">{msg.name}</p>
                      <span className="text-xs text-gray-400">·</span>
                      <a
                        href={`mailto:${msg.email}`}
                        className="text-xs text-[var(--color-primary)] hover:underline"
                      >
                        {msg.email}
                      </a>
                    </div>
                    <p className="mt-1 text-sm font-medium text-gray-700">{msg.subject}</p>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">{msg.message}</p>
                  </div>
                </div>
                <time className="shrink-0 text-xs text-gray-400">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </time>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

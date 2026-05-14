import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import AdminShell from './AdminShell'

/**
 * Admin layout — checks if user is admin via:
 * 1. Clerk publicMetadata.role === "admin"
 * 2. OR email matches ADMIN_EMAIL env var
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  const user = await currentUser()
  if (!user) {
    redirect('/sign-in')
  }

  // Check role from Clerk publicMetadata
  const metadataRole = (user.publicMetadata as { role?: string })?.role
  const userEmail = user.emailAddresses?.[0]?.emailAddress

  // Admin if metadata says so OR email matches ADMIN_EMAIL
  const isAdmin =
    metadataRole === 'admin' ||
    userEmail === process.env.ADMIN_EMAIL

  if (!isAdmin) {
    redirect('/')
  }

  return <AdminShell>{children}</AdminShell>
}

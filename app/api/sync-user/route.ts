import { auth, currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

/**
 * POST /api/sync-user
 * Syncs the current Clerk user to the database.
 * Reads role from Clerk publicMetadata.
 */
export async function POST() {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const clerkUser = await currentUser()
  if (!clerkUser) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const email = clerkUser.emailAddresses[0]?.emailAddress ?? ''

  // Read role from Clerk's publicMetadata (set in Clerk Dashboard)
  const clerkRole = (clerkUser.publicMetadata as { role?: string })?.role
  const isAdmin = clerkRole === 'admin'

  const user = await prisma.user.upsert({
    where: { id: userId },
    update: {
      email,
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName,
      phone: clerkUser.phoneNumbers[0]?.phoneNumber ?? null,
      role: isAdmin ? 'ADMIN' : 'CUSTOMER',
    },
    create: {
      id: userId,
      email,
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName,
      phone: clerkUser.phoneNumbers[0]?.phoneNumber ?? null,
      role: isAdmin ? 'ADMIN' : 'CUSTOMER',
    },
  })

  return NextResponse.json({ user })
}

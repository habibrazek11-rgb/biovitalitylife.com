'use client'

import { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter, usePathname } from 'next/navigation'

/**
 * Redirects admin users to /admin when they land on the homepage after sign-in.
 * Checks both Clerk publicMetadata.role AND the user's email against known admin emails.
 */
export function useAdminRedirect() {
  const { isSignedIn, user } = useUser()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isSignedIn || !user) return
    if (pathname !== '/') return

    // Check Clerk publicMetadata
    const metadataRole = (user.publicMetadata as { role?: string })?.role

    // Check if email matches admin email (client-side env var not available,
    // so we check against a hardcoded list or use metadata)
    const userEmail = user.emailAddresses?.[0]?.emailAddress

    // Admin if metadata says so OR if email is the known admin email
    const isAdmin =
      metadataRole === 'admin' ||
      userEmail === 'contact@biovitalitylife.com'

    if (isAdmin) {
      router.push('/admin')
    }
  }, [isSignedIn, user, pathname, router])
}

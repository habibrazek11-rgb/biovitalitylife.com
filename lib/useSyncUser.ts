'use client'

import { useEffect, useRef } from 'react'
import { useUser } from '@clerk/nextjs'

/**
 * Hook that syncs the Clerk user to our database on first load.
 * Call this in any client component that renders after sign-in.
 */
export function useSyncUser() {
  const { isSignedIn } = useUser()
  const synced = useRef(false)

  useEffect(() => {
    if (isSignedIn && !synced.current) {
      synced.current = true
      fetch('/api/sync-user', { method: 'POST' }).catch(() => {
        // Silent fail — user will be synced on next visit
      })
    }
  }, [isSignedIn])
}

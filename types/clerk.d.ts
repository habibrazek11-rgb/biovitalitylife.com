/**
 * Extend Clerk's session claims to include publicMetadata.
 * 
 * In Clerk Dashboard → Sessions → Customize session token, add:
 * {
 *   "metadata": "{{user.public_metadata}}"
 * }
 * 
 * Then set the user's Public Metadata to:
 * { "role": "admin" }
 */

export {}

declare global {
  interface CustomJwtSessionClaims {
    metadata?: {
      role?: 'admin' | 'customer'
    }
  }
}

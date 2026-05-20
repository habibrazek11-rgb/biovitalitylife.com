import { clerkMiddleware, createRouteMatcher, clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isAdminRoute = createRouteMatcher(['/admin(.*)'])
const isProtectedRoute = createRouteMatcher(['/account(.*)', '/checkout(.*)'])

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth()

  // Protect admin routes — must be signed in (role check done in layout)
  if (isAdminRoute(req)) {
    if (!userId) {
      return NextResponse.redirect(new URL('/sign-in', req.url))
    }
  }

  // Protect account/checkout — must be signed in
  if (isProtectedRoute(req)) {
    if (!userId) {
      return NextResponse.redirect(new URL('/sign-in', req.url))
    }
  }

  // Redirect admin users to /admin only right after sign-in
  if (userId && req.nextUrl.pathname === '/') {
    const referer = req.headers.get('referer') || ''
    const isComingFromSignIn = referer.includes('/sign-in')

    if (isComingFromSignIn) {
      const client = await clerkClient()
      const user = await client.users.getUser(userId)
      const role = (user.publicMetadata as { role?: string })?.role

      if (role === 'admin') {
        return NextResponse.redirect(new URL('/admin', req.url))
      }
    }
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}

import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

// Public: get published blog posts only
export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(posts)
  } catch {
    return NextResponse.json([], { status: 200 })
  }
}

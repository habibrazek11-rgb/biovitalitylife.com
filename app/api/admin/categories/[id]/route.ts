import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

// PUT update category
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const body = await req.json()
  const { name, description, image } = body

  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

  const category = await prisma.category.update({
    where: { id },
    data: { name, slug, description, image },
  })

  return NextResponse.json(category)
}

// DELETE category
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  await prisma.category.delete({ where: { id } })

  return NextResponse.json({ success: true })
}

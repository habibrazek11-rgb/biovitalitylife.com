import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

// PUT update product
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const body = await req.json()
  const {
    name, line, price, currency, shortDescription, description,
    badge, images, benefits, howToUse, certifications, categoryId, inStock,
  } = body

  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

  const product = await prisma.product.update({
    where: { id },
    data: {
      name,
      slug,
      line,
      price: parseFloat(price),
      currency: currency || 'AED',
      shortDescription,
      description,
      badge,
      images: images || [],
      benefits: benefits || [],
      howToUse: howToUse || [],
      certifications: certifications || [],
      categoryId: categoryId || null,
      inStock: inStock ?? true,
    },
  })

  return NextResponse.json(product)
}

// DELETE product
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  await prisma.product.delete({ where: { id } })

  return NextResponse.json({ success: true })
}

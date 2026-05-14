import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

// GET all products
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: { category: { select: { id: true, name: true } } },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(products)
  } catch (error) {
    console.error('[products GET]', error)
    return NextResponse.json([], { status: 200 })
  }
}

// POST create product
export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const {
    name, line, price, currency, shortDescription, description,
    badge, images, benefits, howToUse, certifications, categoryId, inStock,
  } = body

  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

  const product = await prisma.product.create({
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

  return NextResponse.json(product, { status: 201 })
}

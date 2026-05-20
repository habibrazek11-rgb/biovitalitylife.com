import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

// GET public products (in-stock only)
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: { inStock: true },
      include: { category: { select: { id: true, name: true } } },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(products)
  } catch (error) {
    console.error('[public products GET]', error)
    return NextResponse.json([], { status: 200 })
  }
}

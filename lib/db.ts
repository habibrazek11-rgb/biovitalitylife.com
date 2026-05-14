import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const g = globalThis as any

function createClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    throw new Error(
      `DATABASE_URL is not defined. Env keys: ${Object.keys(process.env).filter(k => k.includes('DATA')).join(', ') || 'none'}`
    )
  }

  const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const adapter = new PrismaPg(pool as any)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new PrismaClient({ adapter } as any)
}

/**
 * Get or create the Prisma client.
 * Never caches a client that was created without DATABASE_URL.
 */
function getClient(): PrismaClient {
  // Always recreate if no cached client
  if (!g.__prisma_db) {
    g.__prisma_db = createClient()
  }
  return g.__prisma_db
}

/**
 * Prisma client — lazily initialized on first property access.
 */
export const prisma: PrismaClient = new Proxy({} as PrismaClient, {
  get(_target, prop: string | symbol) {
    const client = getClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const val = (client as any)[prop]
    return typeof val === 'function' ? val.bind(client) : val
  },
})

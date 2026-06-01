import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import TopBar from '@/components/TopBar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BlogPostContent from './BlogPostContent'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true },
    })
    return posts.map((p) => ({ slug: p.slug }))
  } catch {
    // Fallback static slugs
    return [
      { slug: 'benefits-of-prickly-pear-vinegar' },
      { slug: 'how-to-use-vinegar-in-cooking' },
      { slug: 'what-is-the-mother-in-vinegar' },
    ]
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params

  // Try DB first
  let post = null
  try {
    post = await prisma.blogPost.findUnique({ where: { slug } })
  } catch {}

  // Fallback to static posts
  if (!post) {
    const staticPosts: Record<string, any> = {
      'benefits-of-prickly-pear-vinegar': {
        title: '7 Proven Benefits of Organic Prickly Pear Vinegar for Your Health',
        image: '/blog/biovitality-organic-prickly-pear-vinegar-7-health-benefits-natural-wellness.jpg',
        category: 'Wellness',
        content: 'Organic prickly pear vinegar has been used for centuries in Mediterranean cultures as a natural health tonic.\n\nOne of the most significant benefits is its ability to support gut health through natural fermentation.\n\nStudies have shown that prickly pear vinegar may help regulate blood sugar levels.\n\nThe high antioxidant content helps protect cells from oxidative stress.\n\nFor those looking to support natural detoxification, prickly pear vinegar aids liver function.\n\nThe anti-inflammatory properties can help reduce bloating and support digestive comfort.\n\nFinally, the natural enzymes present in raw, unfiltered vinegar support nutrient absorption.',
        contentImages: [],
        createdAt: new Date('2024-05-15'),
      },
      'how-to-use-vinegar-in-cooking': {
        title: 'Mediterranean Recipes: Cooking with Prickly Pear Vinegar',
        image: '/blog/biovitality-organic-prickly-pear-vinegar-mediterranean-salad-dressing.jpg',
        category: 'Recipes',
        content: 'Prickly pear vinegar brings a unique fruity acidity to Mediterranean cooking.\n\nFor a simple vinaigrette, combine 2 tablespoons with olive oil, sea salt, and fresh herbs.\n\nUse it as a marinade base for grilled chicken or fish.\n\nDrizzle over roasted vegetables just before serving for a bright finishing touch.\n\nFor a refreshing summer drink, mix 1 tablespoon with sparkling water and honey.',
        contentImages: [],
        createdAt: new Date('2024-05-10'),
      },
      'what-is-the-mother-in-vinegar': {
        title: 'What Is "The Mother" in Vinegar and Why Does It Matter?',
        image: '/blog/biovitality-organic-prickly-pear-vinegar-morning-ritual-wellness-routine.jpg',
        category: 'Education',
        content: 'The cloudy strands floating in raw vinegar are "the Mother" — a sign of the highest quality.\n\nThe Mother is a colony of beneficial bacteria that forms during natural fermentation.\n\nUnlike filtered vinegars, raw vinegar with the Mother retains all natural enzymes and probiotics.\n\nThe probiotics support gut health by introducing beneficial bacteria to your digestive system.\n\nGently shake before use to distribute these beneficial compounds throughout the vinegar.',
        contentImages: [],
        createdAt: new Date('2024-05-05'),
      },
    }

    post = staticPosts[slug]
    if (!post) notFound()
  }

  return (
    <>
      <TopBar />
      <Navbar />
      <main id="main-content">
        <BlogPostContent post={post} />
      </main>
      <Footer />
    </>
  )
}

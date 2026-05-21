import { notFound } from 'next/navigation'
import TopBar from '@/components/TopBar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BlogPostContent from './BlogPostContent'

const posts: Record<string, { title: string; image: string; category: string; date: string; readTime: string; content: string[] }> = {
  'benefits-of-prickly-pear-vinegar': {
    title: '7 Proven Benefits of Organic Prickly Pear Vinegar for Your Health',
    image: '/why-organic-prickly-pear-vinegar/natural_organic.jpeg',
    category: 'Wellness',
    date: 'May 15, 2026',
    readTime: '5 min read',
    content: [
      'Organic prickly pear vinegar has been used for centuries in Mediterranean cultures as a natural health tonic. Made from the fruit of the Opuntia cactus, this vinegar is rich in antioxidants, vitamins, and beneficial enzymes.',
      'One of the most significant benefits is its ability to support gut health. The natural fermentation process creates probiotics and beneficial bacteria that help maintain a healthy digestive system.',
      'Studies have shown that prickly pear vinegar may help regulate blood sugar levels, making it a valuable addition to a balanced diet. The acetic acid content helps slow the absorption of sugars after meals.',
      'The high antioxidant content, including betalains and polyphenols, helps protect cells from oxidative stress. These compounds are unique to prickly pear and are not commonly found in other vinegars.',
      'For those looking to support natural detoxification, prickly pear vinegar aids liver function and helps the body eliminate toxins more efficiently.',
      'The anti-inflammatory properties of prickly pear vinegar can help reduce bloating and support overall digestive comfort when consumed regularly.',
      'Finally, the natural enzymes present in raw, unfiltered vinegar "with the Mother" support nutrient absorption and overall metabolic health.',
    ],
  },
  'how-to-use-vinegar-in-cooking': {
    title: 'Mediterranean Recipes: Cooking with Prickly Pear Vinegar',
    image: '/why-organic-prickly-pear-vinegar/mediterranean_origin.jpeg',
    category: 'Recipes',
    date: 'May 10, 2026',
    readTime: '4 min read',
    content: [
      'Prickly pear vinegar brings a unique fruity acidity to Mediterranean cooking that no other vinegar can replicate. Its subtle sweetness and complex flavor profile make it incredibly versatile in the kitchen.',
      'For a simple vinaigrette, combine 2 tablespoons of BioVitality™ prickly pear vinegar with 4 tablespoons of extra virgin olive oil, a pinch of sea salt, and fresh herbs. This pairs beautifully with mixed greens, grilled vegetables, or fresh mozzarella.',
      'Use it as a marinade base for grilled chicken or fish. The natural acidity tenderizes proteins while adding a distinctive Mediterranean flavor that your guests will love.',
      'Drizzle it over roasted vegetables just before serving for a bright, finishing touch. It works especially well with roasted peppers, eggplant, and zucchini.',
      'For a refreshing summer drink, mix 1 tablespoon with sparkling water, a slice of lemon, and a touch of honey. It is a healthy alternative to sugary beverages.',
    ],
  },
  'what-is-the-mother-in-vinegar': {
    title: 'What Is "The Mother" in Vinegar and Why Does It Matter?',
    image: '/why-organic-prickly-pear-vinegar/with_the_mother.jpeg',
    category: 'Education',
    date: 'May 5, 2026',
    readTime: '3 min read',
    content: [
      'If you have ever noticed cloudy strands floating in a bottle of raw vinegar, you have seen "the Mother." Far from being a defect, this is actually a sign of the highest quality vinegar.',
      'The Mother is a colony of beneficial bacteria (Acetobacter) that forms during the natural fermentation process. It is composed of cellulose and acetic acid bacteria that convert alcohol into vinegar.',
      'Unlike commercially filtered vinegars, raw vinegar with the Mother retains all of its natural enzymes, probiotics, and beneficial compounds. This is why BioVitality™ never filters or pasteurizes our vinegar.',
      'The probiotics in the Mother support gut health by introducing beneficial bacteria to your digestive system. Regular consumption can help maintain a healthy gut microbiome.',
      'When you see the Mother in your BioVitality™ bottle, gently shake before use to distribute these beneficial compounds throughout the vinegar. Store in a cool, dark place to preserve its living cultures.',
    ],
  },
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }))
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = posts[slug]
  if (!post) notFound()

  return (
    <>
      <TopBar />
      <Navbar />
      <main id="main-content">
        <BlogPostContent post={{ slug, ...post }} />
      </main>
      <Footer />
    </>
  )
}

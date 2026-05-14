/**
 * BioVitality™ product catalog
 * Static data — swap image src values once real assets are available.
 */

export interface Product {
  id: string
  slug: string
  name: string
  line: 'pharma' | 'food'
  price: number
  currency: string
  rating: number
  reviewCount: number
  badge: string
  shortDescription: string
  description: string
  benefits: string[]
  howToUse: string[]
  certifications: string[]
  images: string[]
}

export const products: Product[] = [
  {
    id: 'pharma-line-250ml',
    slug: 'pharma-line-250ml',
    name: 'BioVitality™ Pharma Line – Organic Prickly Pear Vinegar 250ml',
    line: 'pharma',
    price: 85,
    currency: 'AED',
    rating: 5.0,
    reviewCount: 24,
    badge: 'Best Seller',
    shortDescription:
      'Raw unfiltered vinegar with the Mother. For detox, gut health and daily wellness.',
    description:
      'BioVitality™ Pharma Line is a premium raw, unfiltered organic prickly pear vinegar crafted from handpicked Tunisian cactus fruit. Fermented using traditional slow-fermentation methods, it retains the living "Mother" — a colony of beneficial bacteria, enzymes and proteins that make it a true wellness powerhouse. Free from additives, preservatives and synthetic chemicals.',
    benefits: [
      'Detox & Body Cleansing',
      'Gut Health Support',
      'Improved Digestion',
      'Antioxidant Protection',
      'Natural Energy & Vitality',
      'Weight Management Ally',
    ],
    howToUse: [
      'Morning detox shot: 1 tbsp in warm water',
      'Mix with lemon, honey or mint for a wellness tonic',
      'Helps reduce bloating and supports digestion',
      'Supports gut microbiome with the Mother',
      'Ideal for 14–30 day detox routines',
    ],
    certifications: ['EcoCert Organic', 'No Pesticides', 'No Synthetic Fertilizers', 'No Additives'],
    images: ['/prickly-pear-vinegar.jpeg'],
  },
  {
    id: 'food-line-250ml',
    slug: 'food-line-250ml',
    name: 'BioVitality™ Food Line – Organic Prickly Pear Vinegar 250ml',
    line: 'food',
    price: 69,
    currency: 'AED',
    rating: 4.8,
    reviewCount: 18,
    badge: 'Gourmet',
    shortDescription:
      'Mediterranean gourmet vinegar for dressings, marinades and finishing dishes.',
    description:
      'BioVitality™ Food Line brings the authentic flavour of the Mediterranean to your kitchen. Made from organically grown Tunisian prickly pear cactus, this gourmet vinegar adds a unique fruity tang to salads, marinades and grilled dishes. Naturally fermented, free from artificial flavours and preservatives.',
    benefits: [
      'Culinary Excellence',
      'Mediterranean Flavour',
      'Natural & Organic',
      'Versatile Kitchen Ingredient',
      'Rich in Antioxidants',
      'No Artificial Additives',
    ],
    howToUse: [
      'Create dressings & vinaigrettes',
      'Marinades for meat, fish and vegetables',
      '1–2 tbsp in fresh salads',
      'Enhance grilled dishes',
      'Mediterranean finishing touch',
    ],
    certifications: ['EcoCert Organic', 'No Pesticides', 'No Synthetic Fertilizers', 'Gourmet Grade'],
    images: ['/prickly-pear-vinegar-salad.jpeg'],
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

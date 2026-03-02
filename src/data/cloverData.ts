export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'men' | 'women';
  type: string;
  description: string;
  sizes: string[];
  images: string[];
  badge?: string;
}

export const products: Product[] = [
  {
    id: 'm1',
    name: 'Performance Track Jacket',
    price: 129,
    category: 'men',
    type: 'vestes',
    description: 'Veste de performance légère avec technologie respirante et coupe athlétique. Idéale pour l\'entraînement en extérieur.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80'],
    badge: 'Nouveau',
  },
  {
    id: 'm2',
    name: 'Urban Flex Hoodie',
    price: 89,
    category: 'men',
    type: 'pulls',
    description: 'Hoodie en coton premium avec doublure en microfibre. Coupe décontractée pour un style urbain.',
    sizes: ['S', 'M', 'L', 'XL'],
    images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80'],
  },
  {
    id: 'm3',
    name: 'Stealth Training Tee',
    price: 49,
    category: 'men',
    type: 'chemises',
    description: 'T-shirt d\'entraînement avec tissu anti-transpirant et coutures plates pour un confort maximal.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80'],
    badge: 'Best-seller',
  },
  {
    id: 'm4',
    name: 'Carbon Joggers',
    price: 79,
    category: 'men',
    type: 'pantalons',
    description: 'Joggers techniques avec poches zippées et tissu stretch 4 directions. Du studio à la rue.',
    sizes: ['S', 'M', 'L', 'XL'],
    images: ['https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80'],
  },
  {
    id: 'm5',
    name: 'Shadow Running Shorts',
    price: 55,
    category: 'men',
    type: 'pantalons',
    description: 'Short de running ultra-léger avec liner intégré et poche arrière pour téléphone.',
    sizes: ['S', 'M', 'L', 'XL'],
    images: ['https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80'],
  },
  {
    id: 'm6',
    name: 'Elite Compression Top',
    price: 69,
    category: 'men',
    type: 'chemises',
    description: 'Top de compression à manches longues pour une récupération optimale et un maintien musculaire.',
    sizes: ['S', 'M', 'L', 'XL'],
    images: ['https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80'],
  },
  {
    id: 'w1',
    name: 'Aura Sports Bra',
    price: 59,
    category: 'women',
    type: 'accessoires',
    description: 'Brassière de sport à maintien élevé avec bretelles croisées et tissu anti-humidité.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: ['https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80'],
    badge: 'Nouveau',
  },
  {
    id: 'w2',
    name: 'Sculpt High-Waist Leggings',
    price: 89,
    category: 'women',
    type: 'pantalons',
    description: 'Leggings taille haute sculptants avec technologie de compression graduée et tissu anti-squat.',
    sizes: ['XS', 'S', 'M', 'L'],
    images: ['https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80'],
    badge: 'Best-seller',
  },
  {
    id: 'w3',
    name: 'Flow Crop Top',
    price: 45,
    category: 'women',
    type: 'chemises',
    description: 'Crop top fluide et léger, parfait pour le yoga et le pilates. Coupe ample et élégante.',
    sizes: ['XS', 'S', 'M', 'L'],
    images: ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80'],
  },
  {
    id: 'w4',
    name: 'Storm Wind Jacket',
    price: 139,
    category: 'women',
    type: 'vestes',
    description: 'Coupe-vent imperméable avec capuche ajustable et détails réfléchissants pour la course en conditions.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: ['https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800&q=80'],
  },
  {
    id: 'w5',
    name: 'Zen Training Shorts',
    price: 49,
    category: 'women',
    type: 'pantalons',
    description: 'Short d\'entraînement confortable avec taille élastique et fente latérale pour une liberté de mouvement totale.',
    sizes: ['XS', 'S', 'M', 'L'],
    images: ['https://images.unsplash.com/photo-1594381898411-846e7d193883?w=800&q=80'],
  },
  {
    id: 'w6',
    name: 'Velocity Zip Hoodie',
    price: 99,
    category: 'women',
    type: 'pulls',
    description: 'Hoodie zippé avec poches kangourou et doublure polaire. Un essentiel pour la transition saison.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: ['https://images.unsplash.com/photo-1614251055880-ee96e4803393?w=800&q=80'],
  },
];

export const productTypes = ['pulls', 'pantalons', 'chemises', 'vestes', 'accessoires'];

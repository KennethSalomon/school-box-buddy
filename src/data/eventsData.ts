export interface YPEvent {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  category: 'concert' | 'sport' | 'theatre' | 'festival' | 'gala';
  image: string;
  price: number;
  vipPrice?: number;
  isLive?: boolean;
  isSoldOut?: boolean;
  description: string;
  availableSeats: number;
}

export interface Pass {
  id: string;
  eventId: string;
  event: YPEvent;
  tier: 'standard' | 'vip' | 'platinum';
  qrCode: string;
  purchaseDate: string;
  status: 'active' | 'used' | 'expired';
  seatInfo?: string;
}

export const events: YPEvent[] = [
  {
    id: 'ev1',
    title: 'RENAISSANCE WORLD TOUR',
    subtitle: 'An Evening of Pure Artistry',
    date: '2026-04-18',
    time: '20:00',
    venue: 'Stade de France',
    city: 'Paris',
    category: 'concert',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80',
    price: 145,
    vipPrice: 380,
    isLive: true,
    description: 'Une soirée inoubliable mêlant musique, art visuel et performances scéniques de classe mondiale.',
    availableSeats: 234,
  },
  {
    id: 'ev2',
    title: 'GRAND PRIX DE MONACO',
    subtitle: 'Formula 1 — Circuit de Monaco',
    date: '2026-05-24',
    time: '15:00',
    venue: 'Circuit de Monaco',
    city: 'Monaco',
    category: 'sport',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80',
    price: 520,
    vipPrice: 2400,
    description: 'Le Grand Prix le plus prestigieux du calendrier F1. Vivez la course depuis les tribunes exclusives du port.',
    availableSeats: 89,
  },
  {
    id: 'ev3',
    title: 'LE LAC DES CYGNES',
    subtitle: 'Ballet National — Saison Exceptionnelle',
    date: '2026-03-28',
    time: '19:30',
    venue: 'Opéra Garnier',
    city: 'Paris',
    category: 'theatre',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    price: 95,
    vipPrice: 280,
    description: 'Le chef-d\'œuvre de Tchaïkovski interprété par les meilleurs danseurs du monde dans un cadre somptueux.',
    availableSeats: 156,
  },
  {
    id: 'ev4',
    title: 'ELECTRO NIGHTS',
    subtitle: 'Festival International de Musique Électronique',
    date: '2026-07-12',
    time: '22:00',
    venue: 'Parc des Expositions',
    city: 'Lyon',
    category: 'festival',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
    price: 75,
    vipPrice: 190,
    isLive: true,
    description: 'Trois scènes, vingt artistes internationaux, une nuit inoubliable sous les étoiles.',
    availableSeats: 1200,
  },
  {
    id: 'ev5',
    title: 'GALA CHARITÉ MONACO',
    subtitle: 'Soirée de Bienfaisance — Dress Code Black Tie',
    date: '2026-06-08',
    time: '20:30',
    venue: 'Hôtel de Paris',
    city: 'Monte-Carlo',
    category: 'gala',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
    price: 850,
    vipPrice: 3500,
    description: 'Un dîner gastronomique suivi d\'une vente aux enchères caritative dans le cadre le plus prestigieux de la Riviera.',
    availableSeats: 42,
  },
  {
    id: 'ev6',
    title: 'JAZZ & SOUL EXPERIENCE',
    subtitle: 'A Night Under The Stars',
    date: '2026-08-20',
    time: '21:00',
    venue: 'Théâtre Antique',
    city: 'Orange',
    category: 'concert',
    image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&q=80',
    price: 65,
    description: 'Les plus grandes voix du jazz et de la soul réunies pour une soirée d\'exception en plein air.',
    availableSeats: 450,
  },
];

export const eventCategories = [
  { id: 'concert', label: 'Concerts' },
  { id: 'sport', label: 'Sport' },
  { id: 'theatre', label: 'Théâtre' },
  { id: 'festival', label: 'Festivals' },
  { id: 'gala', label: 'Galas' },
] as const;

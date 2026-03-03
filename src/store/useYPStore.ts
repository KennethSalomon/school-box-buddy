import { create } from 'zustand';
import { YPEvent, Pass } from '@/data/eventsData';

interface YPState {
  passes: Pass[];
  acquirePass: (event: YPEvent, tier: 'standard' | 'vip' | 'platinum') => void;
  passCount: () => number;
}

const generateQR = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length: 16 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

export const useYPStore = create<YPState>((set, get) => ({
  passes: [
    {
      id: 'pass-demo-1',
      eventId: 'ev3',
      event: {
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
        description: '',
        availableSeats: 156,
      },
      tier: 'vip',
      qrCode: 'YP-VIP-CYGNES-2026',
      purchaseDate: '2026-02-14',
      status: 'active',
      seatInfo: 'Loge Impériale — Rang A, Place 3',
    },
  ],

  acquirePass: (event, tier) => {
    const pass: Pass = {
      id: `pass-${Date.now()}`,
      eventId: event.id,
      event,
      tier,
      qrCode: `YP-${tier.toUpperCase()}-${generateQR()}`,
      purchaseDate: new Date().toISOString().split('T')[0],
      status: 'active',
    };
    set((state) => ({ passes: [pass, ...state.passes] }));
  },

  passCount: () => get().passes.filter(p => p.status === 'active').length,
}));

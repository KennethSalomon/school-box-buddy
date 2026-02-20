import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { Bell, Search, ChevronRight, Package } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { packs, categories } from '@/data/mockData';
import UserLayout from '@/layouts/UserLayout';

const banners = [
  { title: '🎒 Rentrée 2024-2025', subtitle: 'Jusqu\'à -20% sur les packs', bg: 'bg-primary' },
  { title: '📦 Livraison offerte', subtitle: 'Pour toute commande > 10 000 FCFA', bg: 'bg-secondary' },
];

const HomeScreen = () => {
  const navigate = useNavigate();
  const { currentUser } = useStore();

  return (
    <UserLayout>
      <div className="pb-4">
        {/* Header */}
        <div className="sb-gradient-hero px-4 pt-6 pb-8 rounded-b-[24px]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-secondary-foreground/60 text-sm">Bonjour</p>
              <h1 className="text-xl font-bold text-secondary-foreground">{currentUser?.firstName} 👋</h1>
            </div>
            <button className="relative w-10 h-10 bg-secondary-foreground/10 rounded-full flex items-center justify-center">
              <Bell className="w-5 h-5 text-secondary-foreground" />
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-primary rounded-full border-2 border-secondary" />
            </button>
          </div>
          <div className="relative" onClick={() => navigate('/app/search')}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              readOnly
              placeholder="Rechercher une école ou une classe..."
              className="pl-10 bg-card cursor-pointer border-0"
            />
          </div>
        </div>

        {/* Banner */}
        <div className="px-4 mt-5">
          <div className="overflow-x-auto flex gap-3 -mx-4 px-4 snap-x">
            {banners.map((b, i) => (
              <div key={i} className={`${b.bg} rounded-card p-5 min-w-[280px] snap-start flex-shrink-0`}>
                <h3 className="font-bold text-secondary-foreground text-lg">{b.title}</h3>
                <p className="text-secondary-foreground/70 text-sm mt-1">{b.subtitle}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Packs populaires */}
        <div className="px-4 mt-7">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-foreground">Packs populaires</h2>
            <button className="text-sm text-primary font-semibold flex items-center gap-1">
              Voir tout <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="overflow-x-auto flex gap-3 -mx-4 px-4 snap-x">
            {packs.map(p => (
              <div key={p.id} className="sb-card p-4 min-w-[200px] snap-start flex-shrink-0 hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/app/search')}>
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-3">
                  <Package className="w-6 h-6 text-accent" />
                </div>
                <span className="inline-block text-xs font-semibold bg-accent/10 text-accent px-2 py-0.5 rounded-full mb-2">{p.level}</span>
                <h3 className="font-bold text-foreground text-sm">{p.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{p.description}</p>
                <p className="text-lg font-bold text-primary mt-2">{p.price.toLocaleString()} FCFA</p>
                <p className="text-xs text-muted-foreground">{p.items} articles</p>
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="px-4 mt-7">
          <h2 className="text-lg font-bold text-foreground mb-3">Catégories</h2>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {categories.map(c => (
              <button
                key={c.id}
                onClick={() => navigate('/app/search')}
                className="sb-card p-4 flex flex-col items-center gap-2 hover:shadow-md transition-all"
              >
                <span className="text-3xl">{c.icon}</span>
                <span className="text-xs font-semibold text-foreground">{c.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default HomeScreen;

import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useStore } from '@/store/useStore';
import { Bell, Search, ChevronRight, Package, Sparkles, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { packs, categories } from '@/data/mockData';
import UserLayout from '@/layouts/UserLayout';

const banners = [
  { title: '🎒 Rentrée 2025-2026', subtitle: 'Jusqu\'à -20% sur les packs', gradient: 'from-primary to-primary/80' },
  { title: '📦 Livraison offerte', subtitle: 'Pour toute commande > 10 000 FCFA', gradient: 'from-secondary to-secondary/80' },
  { title: '⭐ Premium Quality', subtitle: 'Des fournitures durables et élégantes', gradient: 'from-accent to-accent/80' },
];

const HomeScreen = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();

  return (
    <UserLayout>
      <div className="pb-4">
        {/* Header */}
        <div className="sb-gradient-hero px-4 pt-6 pb-10 rounded-b-[28px] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-accent/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-primary/10 blur-2xl" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-secondary-foreground/50 text-sm font-medium">Bonjour</p>
                <h1 className="text-xl font-bold text-secondary-foreground">{profile?.first_name || 'Ami'} 👋</h1>
              </div>
              <button className="relative w-11 h-11 sb-card-glass rounded-full flex items-center justify-center border border-white/15">
                <Bell className="w-5 h-5 text-secondary-foreground" />
                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-primary rounded-full border-2 border-secondary animate-pulse" />
              </button>
            </div>
            <div className="relative" onClick={() => navigate('/app/search')}>
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                readOnly
                placeholder="Rechercher une école ou une classe..."
                className="pl-10 h-12 bg-card cursor-pointer border-0 shadow-lg rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Banners */}
        <div className="px-4 mt-5">
          <div className="overflow-x-auto flex gap-3 -mx-4 px-4 snap-x">
            {banners.map((b, i) => (
              <div key={i} className={`bg-gradient-to-br ${b.gradient} rounded-2xl p-5 min-w-[280px] snap-start flex-shrink-0 relative overflow-hidden`}>
                <div className="absolute top-2 right-2 w-16 h-16 rounded-full bg-white/5 blur-xl" />
                <h3 className="font-bold text-secondary-foreground text-lg relative z-10">{b.title}</h3>
                <p className="text-secondary-foreground/70 text-sm mt-1 relative z-10">{b.subtitle}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Packs populaires */}
        <div className="px-4 mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-extrabold text-foreground flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" /> Packs populaires
            </h2>
            <button className="text-sm text-primary font-bold flex items-center gap-1 hover:underline">
              Voir tout <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="overflow-x-auto flex gap-3 -mx-4 px-4 snap-x">
            {packs.map((p, idx) => (
              <div key={p.id} className="sb-card-hover p-5 min-w-[210px] snap-start flex-shrink-0 cursor-pointer group" onClick={() => navigate('/app/search')}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${idx === 1 ? 'sb-gradient-primary sb-glow-primary' : 'bg-accent/10'}`}>
                  <Package className={`w-6 h-6 ${idx === 1 ? 'text-primary-foreground' : 'text-accent'}`} />
                </div>
                <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full mb-2 ${idx === 1 ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'}`}>
                  {idx === 1 && <Star className="w-3 h-3" />} {p.level}
                </span>
                <h3 className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">{p.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{p.description}</p>
                <p className="text-lg font-extrabold text-primary mt-3">{p.price.toLocaleString()} <span className="text-xs font-semibold">FCFA</span></p>
                <p className="text-xs text-muted-foreground">{p.items} articles</p>
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="px-4 mt-8">
          <h2 className="text-lg font-extrabold text-foreground mb-4">Catégories</h2>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {categories.map(c => (
              <button
                key={c.id}
                onClick={() => navigate('/app/search')}
                className="sb-card-hover p-4 flex flex-col items-center gap-2.5 group"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{c.icon}</span>
                <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">{c.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default HomeScreen;

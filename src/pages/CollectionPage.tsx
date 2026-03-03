import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { events, eventCategories } from '@/data/eventsData';
import EventCard from '@/components/yp/EventCard';
import AnimatedSection from '@/components/yp/AnimatedSection';

const CollectionPage = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return events.filter((ev) => {
      const matchesSearch =
        !search ||
        ev.title.toLowerCase().includes(search.toLowerCase()) ||
        ev.venue.toLowerCase().includes(search.toLowerCase()) ||
        ev.city.toLowerCase().includes(search.toLowerCase()) ||
        ev.subtitle.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !activeCategory || ev.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <div className="min-h-screen pt-20 pb-24 page-enter">
      {/* Header with parallax */}
      <div className="relative overflow-hidden py-12 md:py-16 mb-8">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="parallax-text text-[6rem] md:text-[12rem] whitespace-nowrap">
            COLLECTION
          </span>
        </div>
        <div className="container relative z-10 text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase text-primary font-bold mb-3">Événements</p>
          <h1 className="font-headline text-4xl md:text-6xl">La Collection</h1>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="container space-y-5 mb-10">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} strokeWidth={1.5} />
          <input
            type="text"
            placeholder="Rechercher un événement, un lieu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-card border border-foreground/10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors tracking-wide"
          />
        </div>

        <div className="flex items-center justify-center gap-2 flex-wrap">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-1.5 text-[10px] font-bold tracking-widest uppercase transition-all border ${
              !activeCategory
                ? 'bg-foreground text-background border-foreground'
                : 'bg-transparent text-foreground/50 border-foreground/10 hover:border-foreground/30'
            }`}
          >
            Tous
          </button>
          {eventCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
              className={`px-4 py-1.5 text-[10px] font-bold tracking-widest uppercase transition-all border ${
                activeCategory === cat.id
                  ? 'bg-foreground text-background border-foreground'
                  : 'bg-transparent text-foreground/50 border-foreground/10 hover:border-foreground/30'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="container grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
        {filtered.map((event, i) => (
          <AnimatedSection key={event.id} delay={i * 80}>
            <EventCard event={event} index={i} />
          </AnimatedSection>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-20 text-muted-foreground text-sm tracking-wider">
            Aucun événement trouvé.
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionPage;

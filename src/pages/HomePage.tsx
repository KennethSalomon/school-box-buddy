import { Link } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';
import AnimatedSection from '@/components/yp/AnimatedSection';
import HeroTicket from '@/components/yp/HeroTicket';
import EventCard from '@/components/yp/EventCard';
import { events } from '@/data/eventsData';

const HomePage = () => {
  const featured = events.slice(0, 3);

  return (
    <div className="min-h-screen page-enter">
      {/* Hero */}
      <section className="relative h-screen overflow-hidden film-grain flex items-center justify-center">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />

        {/* Parallax text */}
        <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none">
          <div className="animate-marquee flex whitespace-nowrap">
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i} className="parallax-text text-[10rem] md:text-[16rem] mx-8">
                YOUR⚡PASS
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 gap-12">
          {/* Floating ticket */}
          <div className="opacity-0 animate-slide-fade-up">
            <HeroTicket />
          </div>

          {/* Text */}
          <div className="space-y-6">
            <h1 className="opacity-0 animate-slide-fade-up stagger-2 font-headline text-4xl md:text-6xl lg:text-7xl leading-tight">
              Votre Coffre-Fort<br />
              <span className="text-primary">Digital</span>
            </h1>
            <p className="opacity-0 animate-slide-fade-up stagger-3 text-muted-foreground text-sm md:text-base max-w-md mx-auto leading-relaxed">
              Authentification en temps réel. Événements exclusifs. Pass premium.
            </p>
            <Link
              to="/collection"
              className="opacity-0 animate-slide-fade-up stagger-4 inline-flex items-center gap-3 btn-luxe bg-foreground text-background px-8 py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              La Collection Your
              <Zap size={12} className="fill-current" />
              Pass
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured events */}
      <section className="py-24 md:py-32 relative">
        <div className="container">
          <AnimatedSection>
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-[10px] tracking-[0.4em] uppercase text-primary font-bold mb-2">Sélection</p>
                <h2 className="font-headline text-3xl md:text-5xl">Événements à la Une</h2>
              </div>
              <Link
                to="/collection"
                className="hidden md:flex items-center gap-2 text-[11px] tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                Voir tout <ArrowRight size={12} />
              </Link>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((event, i) => (
              <AnimatedSection key={event.id} delay={i * 120}>
                <EventCard event={event} index={i} />
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={400}>
            <div className="md:hidden mt-8 text-center">
              <Link
                to="/collection"
                className="inline-flex items-center gap-2 text-[11px] tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                Voir toute la collection <ArrowRight size={12} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Marquee */}
      <section className="border-y border-foreground/5 py-5 overflow-hidden">
        <div className="animate-marquee flex whitespace-nowrap">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="text-foreground/[0.04] text-4xl md:text-5xl font-headline font-bold mx-8">
              EXCLUSIVITÉ • AUTHENTICITÉ • PRESTIGE • CONFIANCE •
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
        <div className="container relative z-10 text-center max-w-2xl mx-auto">
          <AnimatedSection>
            <p className="text-[10px] tracking-[0.4em] uppercase text-primary font-bold mb-4">L'Expérience</p>
            <h2 className="font-headline text-3xl md:text-5xl mb-6">
              Des Pass qui deviennent des Souvenirs
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-10 max-w-lg mx-auto">
              Chaque pass est un actif précieux, sécurisé dans votre coffre-fort digital personnel. 
              Authentification instantanée, accès garanti.
            </p>
            <Link
              to="/collection"
              className="inline-flex items-center gap-3 btn-luxe bg-primary text-primary-foreground px-8 py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:opacity-90 transition-opacity"
            >
              Faire l'acquisition d'un Pass <ArrowRight size={14} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-foreground/5 py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-1">
              <span className="font-identity text-[10px] tracking-[0.3em] text-foreground/40">YOUR</span>
              <Zap size={10} className="text-primary fill-primary" />
              <span className="font-identity text-[10px] tracking-[0.3em] text-foreground/40">PASS</span>
            </div>
            <div className="flex gap-8 text-[10px] tracking-widest uppercase text-foreground/30">
              <Link to="/collection" className="hover:text-foreground/60 transition-colors">Collection</Link>
              <Link to="/mes-pass" className="hover:text-foreground/60 transition-colors">Mon Vault</Link>
            </div>
            <p className="text-[10px] text-foreground/20 tracking-wider">© 2026 YOUR⚡PASS. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

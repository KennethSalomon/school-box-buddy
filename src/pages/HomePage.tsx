import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import heroImg from '@/assets/hero-clover.jpg';
import menImg from '@/assets/lifestyle-men.jpg';
import womenImg from '@/assets/lifestyle-women.jpg';
import AnimatedSection from '@/components/clover/AnimatedSection';
import { products } from '@/data/cloverData';
import ProductCard from '@/components/clover/ProductCard';

const HomePage = () => {
  const featured = products.filter((p) => p.badge).slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-screen overflow-hidden bg-foreground">
        <img
          src={heroImg}
          alt="CLOVER Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        {/* Parallax overlay text */}
        <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none">
          <div className="animate-marquee flex whitespace-nowrap">
            <span className="parallax-text text-[10rem] md:text-[16rem] mx-8">WORKOUT</span>
            <span className="parallax-text text-[10rem] md:text-[16rem] mx-8">PERFORM</span>
            <span className="parallax-text text-[10rem] md:text-[16rem] mx-8">ELEVATE</span>
            <span className="parallax-text text-[10rem] md:text-[16rem] mx-8">WORKOUT</span>
            <span className="parallax-text text-[10rem] md:text-[16rem] mx-8">PERFORM</span>
            <span className="parallax-text text-[10rem] md:text-[16rem] mx-8">ELEVATE</span>
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="animate-text-reveal text-5xl md:text-8xl font-display font-bold text-background leading-tight mb-6">
            FOR YOUR<br />NEXT MOVE
          </h1>
          <p className="animate-text-reveal text-background/70 text-lg md:text-xl max-w-md mb-10" style={{ animationDelay: '200ms' }}>
            Performance meets style. Vêtements athlétiques premium.
          </p>
          <Link
            to="/homme"
            className="animate-text-reveal inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-display font-bold text-sm tracking-wide hover:opacity-90 transition-opacity"
            style={{ animationDelay: '400ms' }}
          >
            EXPLORER <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-center mb-12">
              Collections
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <AnimatedSection delay={100}>
              <Link to="/homme" className="group relative block aspect-[4/5] overflow-hidden rounded-lg">
                <img src={menImg} alt="Homme" className="img-zoom w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <h3 className="text-3xl font-display font-bold text-background mb-2">Homme</h3>
                  <span className="inline-flex items-center gap-1 text-sm text-background/80 group-hover:text-primary transition-colors">
                    Découvrir <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <Link to="/femme" className="group relative block aspect-[4/5] overflow-hidden rounded-lg">
                <img src={womenImg} alt="Femme" className="img-zoom w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <h3 className="text-3xl font-display font-bold text-background mb-2">Femme</h3>
                  <span className="inline-flex items-center gap-1 text-sm text-background/80 group-hover:text-primary transition-colors">
                    Découvrir <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container">
          <AnimatedSection>
            <div className="flex items-end justify-between mb-10">
              <h2 className="text-3xl md:text-5xl font-display font-bold">
                Sélection
              </h2>
              <Link to="/homme" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                Tout voir <ArrowRight size={14} />
              </Link>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featured.map((product, i) => (
              <AnimatedSection key={product.id} delay={i * 100}>
                <ProductCard product={product} index={i} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee banner */}
      <section className="bg-foreground py-6 overflow-hidden">
        <div className="animate-marquee flex whitespace-nowrap">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="text-background/20 text-4xl md:text-6xl font-display font-bold mx-8">
              CLOVER • PERFORMANCE • STYLE • PREMIUM •
            </span>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background/60 py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <span className="text-xl font-display font-bold text-background">🍀 CLOVER</span>
            <div className="flex gap-6 text-sm">
              <Link to="/homme" className="hover:text-background transition-colors">Homme</Link>
              <Link to="/femme" className="hover:text-background transition-colors">Femme</Link>
              <Link to="/panier" className="hover:text-background transition-colors">Panier</Link>
            </div>
            <p className="text-xs">© 2025 CLOVER. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

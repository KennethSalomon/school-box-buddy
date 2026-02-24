import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import heroImage from '@/assets/hero-sunset.jpg';

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImage} alt="SUNSET Beach restaurant au coucher de soleil" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <p className="text-primary font-medium text-sm md:text-base uppercase tracking-[0.3em] mb-6">
          Bar · Restaurant · Plage
        </p>
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
          RÉUNISSEZ-VOUS ENTRE AMIS ET DÉGUSTEZ DE LA BONNE NOURRITURE
        </h1>
        <p className="text-white/70 text-lg md:text-xl font-light max-w-2xl mx-auto mb-10">
          SUNSET Beach — Votre escapade tropicale pour la gastronomie et la musique.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/commander"
            className="bg-primary text-primary-foreground px-8 py-3.5 rounded-md text-sm font-bold uppercase tracking-[0.15em] hover:opacity-90 transition-opacity"
          >
            Commander maintenant
          </Link>
          <button
            onClick={() => document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' })}
            className="border-2 border-white/40 text-white px-8 py-3.5 rounded-md text-sm font-bold uppercase tracking-[0.15em] hover:border-primary hover:text-primary transition-colors"
          >
            Découvrir le menu
          </button>
        </div>
      </div>

      <button
        onClick={() => document.querySelector('#histoire')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-primary transition-colors animate-bounce"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
};

export default HeroSection;

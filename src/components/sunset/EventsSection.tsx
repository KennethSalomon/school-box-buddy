import { Calendar, Flame } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { events } from '@/data/sunsetData';
import bonfireImage from '@/assets/beach-bonfire.jpg';

const EventsSection = () => {
  return (
    <section id="evenements" className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-primary text-xs uppercase tracking-[0.3em] font-semibold mb-4">Événements</p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground leading-tight mb-4">Vivez des moments uniques</h2>
          </div>
        </AnimatedSection>

        <AnimatedSection className="mb-12">
          <div className="relative rounded-lg overflow-hidden">
            <img src={bonfireImage} alt="Feu de joie sur la plage" className="w-full h-[400px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
              <div className="p-8 md:p-14 max-w-lg">
                <div className="flex items-center gap-2 text-primary mb-3">
                  <Flame size={20} />
                  <span className="text-xs uppercase tracking-[0.2em] font-bold">Chaque Dimanche</span>
                </div>
                <h3 className="font-serif text-3xl md:text-4xl font-bold text-white mb-3">Feu de Joie sur la Plage</h3>
                <p className="text-white/70 mb-2">17h00 — 23h00</p>
                <p className="text-white/60 text-sm leading-relaxed">Musique live, grillades, marshmallows et l'océan comme décor. Le rendez-vous incontournable de votre dimanche.</p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.filter(e => !e.recurring).map((event, i) => (
            <AnimatedSection key={event.id} delay={i * 100}>
              <div className="bg-card rounded-lg p-6 border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-2 text-primary mb-3">
                  <Calendar size={14} />
                  <span className="text-xs font-semibold uppercase tracking-wider">{event.date}</span>
                </div>
                <h4 className="font-serif text-xl font-bold text-foreground mb-2">{event.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{event.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;

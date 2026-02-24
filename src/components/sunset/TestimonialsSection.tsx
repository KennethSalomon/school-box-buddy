import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { testimonials } from '@/data/sunsetData';

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent(c => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent(c => (c + 1) % testimonials.length);
  const t = testimonials[current];

  return (
    <section id="temoignages" className="py-24 md:py-32 bg-background">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <AnimatedSection>
          <p className="text-primary text-xs uppercase tracking-[0.3em] font-semibold mb-4">Témoignages</p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground leading-tight mb-16">Ce que disent nos clients</h2>
        </AnimatedSection>

        <AnimatedSection>
          <div className="relative">
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} size={18} className="fill-primary text-primary" />
              ))}
            </div>
            <blockquote className="font-serif text-xl md:text-2xl text-foreground leading-relaxed italic mb-8">
              "{t.text}"
            </blockquote>
            <p className="text-muted-foreground font-semibold">— {t.name}</p>

            <div className="flex justify-center gap-4 mt-10">
              <button onClick={prev} className="w-10 h-10 rounded-full border border-border hover:border-primary hover:text-primary transition-colors flex items-center justify-center">
                <ChevronLeft size={18} />
              </button>
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-colors ${i === current ? 'bg-primary' : 'bg-border'}`} />
                ))}
              </div>
              <button onClick={next} className="w-10 h-10 rounded-full border border-border hover:border-primary hover:text-primary transition-colors flex items-center justify-center">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default TestimonialsSection;

import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { menuItems } from '@/data/sunsetData';

const categories = [
  { key: 'food' as const, label: 'Nourriture', emoji: '🍽️' },
  { key: 'dessert' as const, label: 'Desserts', emoji: '🍰' },
  { key: 'drink' as const, label: 'Boissons', emoji: '🍹' },
];

const MenuPreview = () => {
  return (
    <section id="menu" className="py-24 md:py-32 bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-primary text-xs uppercase tracking-[0.3em] font-semibold mb-4">Saveurs</p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold leading-tight mb-4">Menu de la Semaine</h2>
            <p className="text-white/60 max-w-xl mx-auto">Des plats préparés avec amour, des ingrédients frais du marché, servis les pieds dans le sable.</p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {categories.map((cat, catIdx) => (
            <AnimatedSection key={cat.key} delay={catIdx * 150}>
              <div>
                <h3 className="text-xl font-serif font-bold mb-6 flex items-center gap-2">
                  <span className="text-2xl">{cat.emoji}</span> {cat.label}
                </h3>
                <div className="space-y-6">
                  {menuItems.filter(i => i.category === cat.key).slice(0, 3).map(item => (
                    <div key={item.id} className="border-b border-white/10 pb-6 last:border-0">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-semibold text-white">{item.name}</h4>
                        <span className="text-primary font-bold whitespace-nowrap ml-3">{item.price.toLocaleString()} F</span>
                      </div>
                      <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
                      {item.tag && <span className="inline-block mt-2 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">{item.tag}</span>}
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center mt-14">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 border-2 border-primary text-primary px-8 py-3 rounded-md text-sm font-bold uppercase tracking-[0.15em] hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Voir le menu complet <ArrowRight size={16} />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default MenuPreview;

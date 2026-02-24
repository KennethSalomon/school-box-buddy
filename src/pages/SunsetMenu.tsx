import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/sunset/Navbar';
import Footer from '@/components/sunset/Footer';
import AnimatedSection from '@/components/sunset/AnimatedSection';
import { menuItems } from '@/data/sunsetData';

const tabs = [
  { key: 'all', label: 'Tout' },
  { key: 'food', label: 'Nourriture' },
  { key: 'dessert', label: 'Desserts' },
  { key: 'drink', label: 'Boissons' },
];

const SunsetMenu = () => {
  const [active, setActive] = useState('all');
  const filtered = active === 'all' ? menuItems : menuItems.filter(i => i.category === active);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-12">
            <p className="text-primary text-xs uppercase tracking-[0.3em] font-semibold mb-4">Notre Carte</p>
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground">Le Menu</h1>
          </AnimatedSection>

          <AnimatedSection className="flex justify-center gap-2 mb-12 flex-wrap">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActive(tab.key)}
                className={`px-5 py-2 rounded-md text-xs font-bold uppercase tracking-[0.1em] transition-colors ${active === tab.key ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground hover:bg-primary/10'}`}
              >
                {tab.label}
              </button>
            ))}
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, i) => (
              <AnimatedSection key={item.id} delay={i * 50}>
                <div className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                  <div className="aspect-[16/10] bg-muted overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/20 flex items-center justify-center text-5xl group-hover:scale-105 transition-transform duration-500">
                      {item.category === 'food' ? '🍽️' : item.category === 'dessert' ? '🍰' : '🍹'}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-serif font-bold text-foreground text-lg">{item.name}</h3>
                      {item.tag && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded ml-2 whitespace-nowrap">{item.tag}</span>}
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-primary font-bold text-lg">{item.price.toLocaleString()} FCFA</span>
                      <Link
                        to="/commander"
                        className="text-xs bg-primary text-primary-foreground px-4 py-2 rounded-md font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
                      >
                        Commander
                      </Link>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SunsetMenu;

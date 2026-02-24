import AnimatedSection from './AnimatedSection';
import cocktailImage from '@/assets/cocktails-bar.jpg';
import { menuItems } from '@/data/sunsetData';

const signatureDrinks = menuItems.filter(i => i.category === 'drink').slice(0, 4);

const BarSection = () => {
  return (
    <section id="bar" className="py-24 md:py-32 bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary text-xs uppercase tracking-[0.3em] font-semibold mb-4">De Notre Bar</p>
              <h2 className="font-serif text-3xl md:text-5xl font-bold leading-tight mb-6">Cocktails Signature</h2>
              <p className="text-white/60 leading-relaxed mb-10">
                Nos mixologues créent des cocktails uniques inspirés des saveurs tropicales et du coucher de soleil africain. Chaque verre est une œuvre d'art liquide.
              </p>
              <div className="space-y-4">
                {signatureDrinks.map(drink => (
                  <div key={drink.id} className="flex items-start gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="w-11 h-11 rounded-full bg-primary/20 flex items-center justify-center text-lg flex-shrink-0">🍹</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-white text-sm">{drink.name}</h4>
                        <span className="text-primary font-bold text-sm whitespace-nowrap ml-3">{drink.price.toLocaleString()} F</span>
                      </div>
                      <p className="text-white/50 text-xs mt-1">{drink.description}</p>
                      {drink.tag && <span className="inline-block mt-1.5 text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded">{drink.tag}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img src={cocktailImage} alt="Cocktails SUNSET Beach" className="rounded-lg w-full aspect-[3/4] object-cover" />
              <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-primary/30 rounded-lg -z-10" />
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default BarSection;

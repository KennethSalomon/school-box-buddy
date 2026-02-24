import AnimatedSection from './AnimatedSection';
import foodImage from '@/assets/food-plating.jpg';

const StorySection = () => {
  return (
    <section id="histoire" className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="relative">
              <img src={foodImage} alt="Cuisine SUNSET Beach" className="rounded-lg w-full aspect-[4/5] object-cover" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-lg -z-10" />
            </div>
            <div>
              <p className="text-primary text-xs uppercase tracking-[0.3em] font-semibold mb-4">Notre Histoire</p>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground leading-tight mb-6">
                Un lieu où le coucher de soleil a un goût de paradis
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Né de la passion d'un chef voyageur et d'un amour inconditionnel pour l'océan, SUNSET Beach est bien plus qu'un restaurant — c'est une expérience. Chaque plat raconte l'histoire des saveurs d'Afrique de l'Ouest, sublimées par des techniques modernes et des ingrédients d'exception.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Les pieds dans le sable, bercé par le bruit des vagues, laissez-vous transporter par notre cuisine généreuse et nos cocktails artisanaux. Ici, chaque coucher de soleil est une invitation à célébrer la vie.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center text-2xl">👨‍🍳</div>
                <div>
                  <p className="font-serif font-bold text-foreground text-lg">Chef Amara Diallo</p>
                  <p className="text-muted-foreground text-sm">Chef exécutif & Fondateur</p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default StorySection;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Package, ShoppingBag, Truck, ArrowRight } from 'lucide-react';

const slides = [
  { icon: ShoppingBag, title: 'Trouve tes fournitures', desc: 'Recherche par école et classe pour trouver la liste officielle de fournitures.', color: 'text-primary', bg: 'bg-primary/10' },
  { icon: Package, title: 'Compose ta box', desc: 'Choisis la qualité, la quantité et ajoute tout dans ta box personnalisée.', color: 'text-accent', bg: 'bg-accent/10' },
  { icon: Truck, title: 'Reçois à domicile', desc: 'Livraison rapide en 24-48h directement chez toi. Simple et pratique !', color: 'text-primary', bg: 'bg-primary/10' },
];

const OnboardingScreen = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="sb-animate-fade-in flex flex-col items-center text-center max-w-sm" key={step}>
          {(() => {
            const Icon = slides[step].icon;
            return (
              <div className={`w-32 h-32 ${slides[step].bg} rounded-3xl flex items-center justify-center mb-8 sb-animate-float sb-luxury-shadow`}>
                <Icon className={`w-16 h-16 ${slides[step].color}`} />
              </div>
            );
          })()}
          <h2 className="text-2xl font-extrabold text-foreground mb-3 tracking-tight">{slides[step].title}</h2>
          <p className="text-muted-foreground leading-relaxed text-[15px]">{slides[step].desc}</p>
        </div>

        <div className="flex gap-2 mt-10">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-500 ${i === step ? 'w-10 bg-primary sb-glow-primary' : 'w-2 bg-muted'}`}
            />
          ))}
        </div>
      </div>

      <div className="px-6 pb-8 space-y-3">
        {step < slides.length - 1 ? (
          <>
            <Button size="lg" className="w-full h-12 sb-glow-primary font-semibold gap-2" onClick={() => setStep(step + 1)}>
              Suivant <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="ghost" className="w-full text-muted-foreground font-medium" onClick={() => navigate('/app/register')}>
              Passer
            </Button>
          </>
        ) : (
          <>
            <Button size="lg" className="w-full h-12 sb-glow-primary font-semibold" onClick={() => navigate('/app/register')}>
              S'inscrire
            </Button>
            <Button variant="outline" className="w-full h-12 font-semibold" onClick={() => navigate('/app/login')}>
              Se connecter
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default OnboardingScreen;

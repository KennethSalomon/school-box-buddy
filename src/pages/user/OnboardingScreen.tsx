import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Package, ShoppingBag, Truck } from 'lucide-react';

const slides = [
  { icon: ShoppingBag, title: 'Trouve tes fournitures', desc: 'Recherche par école et classe pour trouver la liste officielle de fournitures.', color: 'text-primary' },
  { icon: Package, title: 'Compose ta box', desc: 'Choisis la qualité, la quantité et ajoute tout dans ta box personnalisée.', color: 'text-accent' },
  { icon: Truck, title: 'Reçois à domicile', desc: 'Livraison rapide en 24-48h directement chez toi. Simple et pratique !', color: 'text-primary' },
];

const OnboardingScreen = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const { setOnboardingSeen } = useStore();

  const finish = () => {
    setOnboardingSeen();
    navigate('/app/register');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="sb-animate-fade-in flex flex-col items-center text-center max-w-sm" key={step}>
          {(() => {
            const Icon = slides[step].icon;
            return (
              <div className="w-28 h-28 bg-muted rounded-3xl flex items-center justify-center mb-8 sb-animate-float">
                <Icon className={`w-14 h-14 ${slides[step].color}`} />
              </div>
            );
          })()}
          <h2 className="text-2xl font-bold text-foreground mb-3">{slides[step].title}</h2>
          <p className="text-muted-foreground leading-relaxed">{slides[step].desc}</p>
        </div>

        <div className="flex gap-2 mt-10">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-primary' : 'w-2 bg-muted'}`}
            />
          ))}
        </div>
      </div>

      <div className="px-6 pb-8 space-y-3">
        {step < slides.length - 1 ? (
          <>
            <Button size="lg" className="w-full" onClick={() => setStep(step + 1)}>
              Suivant
            </Button>
            <Button variant="ghost" className="w-full text-muted-foreground" onClick={finish}>
              Passer
            </Button>
          </>
        ) : (
          <>
            <Button size="lg" className="w-full" onClick={finish}>
              S'inscrire
            </Button>
            <Button variant="outline" className="w-full" onClick={() => { setOnboardingSeen(); navigate('/app/login'); }}>
              Se connecter
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default OnboardingScreen;

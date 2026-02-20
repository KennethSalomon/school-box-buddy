import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { Package } from 'lucide-react';

const SplashScreen = () => {
  const [animating, setAnimating] = useState(true);
  const navigate = useNavigate();
  const { hasSeenOnboarding, isLoggedIn } = useStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimating(false);
      if (isLoggedIn) {
        navigate('/app/home');
      } else if (hasSeenOnboarding) {
        navigate('/app/login');
      } else {
        navigate('/app/onboarding');
      }
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen sb-gradient-hero flex flex-col items-center justify-center">
      <div className={`sb-animate-box-open flex flex-col items-center gap-4`}>
        <div className="relative">
          <div className="w-24 h-24 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30">
            <Package className="w-12 h-12 text-primary-foreground" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full sb-animate-pulse-dot" />
        </div>
        <h1 className="text-4xl font-bold text-secondary-foreground tracking-tight">
          School <span className="text-primary">Box</span>
        </h1>
        <p className="text-secondary-foreground/60 text-sm font-medium">
          Fournitures scolaires livrées 📦
        </p>
      </div>
      {animating && (
        <div className="absolute bottom-16">
          <div className="w-8 h-8 border-3 border-accent/30 border-t-accent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default SplashScreen;

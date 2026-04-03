import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Package } from 'lucide-react';

const SplashScreen = () => {
  const [animating, setAnimating] = useState(true);
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimating(false);
      if (!loading) {
        if (user) {
          navigate('/app/home');
        } else {
          navigate('/app/onboarding');
        }
      }
    }, 2500);
    return () => clearTimeout(timer);
  }, [loading, user]);

  // If auth loads before timer, wait for timer
  useEffect(() => {
    if (!animating && !loading) {
      if (user) navigate('/app/home');
      else navigate('/app/onboarding');
    }
  }, [animating, loading]);

  return (
    <div className="min-h-screen sb-gradient-hero flex flex-col items-center justify-center relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-20 -left-10 w-40 h-40 rounded-full bg-accent/5 blur-3xl" />
      <div className="absolute bottom-32 -right-10 w-48 h-48 rounded-full bg-primary/8 blur-3xl" />
      
      <div className="sb-animate-box-open flex flex-col items-center gap-5 relative z-10">
        <div className="relative">
          <div className="w-28 h-28 sb-gradient-primary rounded-3xl flex items-center justify-center sb-glow-primary">
            <Package className="w-14 h-14 text-primary-foreground" />
          </div>
          <div className="absolute -top-2 -right-2 w-7 h-7 bg-accent rounded-full sb-animate-pulse-dot sb-glow-accent" />
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-secondary-foreground tracking-tight">
            School <span className="sb-text-gradient">Box</span>
          </h1>
          <p className="text-secondary-foreground/50 text-sm font-medium mt-2 tracking-wide">
            Fournitures scolaires livrées 📦
          </p>
        </div>
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

import { useAuth } from '@/hooks/useAuth';
import { Star, Sparkles } from 'lucide-react';
import UserLayout from '@/layouts/UserLayout';

const LoyaltyScreen = () => {
  const { profile } = useAuth();
  const points = profile?.loyalty_points || 0;
  const nextReward = 2000;
  const progress = Math.min(100, (points / nextReward) * 100);

  return (
    <UserLayout>
      <div className="px-4 pt-6">
        <h1 className="text-xl font-extrabold text-foreground mb-5 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-warning" /> Fidélité
        </h1>

        <div className="sb-card p-6 text-center mb-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-warning/5 blur-3xl" />
          <div className="relative z-10">
            <div className="w-18 h-18 bg-warning/10 rounded-2xl flex items-center justify-center mx-auto mb-3 w-16 h-16">
              <Star className="w-8 h-8 text-warning" fill="currentColor" />
            </div>
            <p className="text-4xl font-extrabold text-foreground">{points.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground font-medium">points de fidélité</p>

            <div className="mt-5">
              <div className="flex justify-between text-xs text-muted-foreground mb-1.5 font-medium">
                <span>{points} pts</span>
                <span>{nextReward} pts — Prochain cadeau 🎁</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-warning to-primary rounded-full transition-all duration-700" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </div>
        </div>

        <h3 className="font-extrabold text-foreground text-sm mb-3">Historique des points</h3>
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">Aucun historique pour le moment</p>
          <p className="text-xs text-muted-foreground mt-1">Passe ta première commande pour gagner des points !</p>
        </div>
      </div>
    </UserLayout>
  );
};

export default LoyaltyScreen;

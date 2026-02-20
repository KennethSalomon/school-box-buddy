import { useStore } from '@/store/useStore';
import { Star } from 'lucide-react';
import UserLayout from '@/layouts/UserLayout';

const LoyaltyScreen = () => {
  const { currentUser } = useStore();
  const points = currentUser?.loyaltyPoints || 0;
  const nextReward = 2000;
  const progress = Math.min(100, (points / nextReward) * 100);

  const history = [
    { label: 'Commande ORD-2024-001', points: 490, date: '15 Sep 2024' },
    { label: 'Commande ORD-2024-004', points: 270, date: '13 Sep 2024' },
    { label: 'Parrainage — Kouadio', points: 500, date: '10 Sep 2024' },
  ];

  return (
    <UserLayout>
      <div className="px-4 pt-6">
        <h1 className="text-xl font-bold text-foreground mb-5">Fidélité ⭐</h1>

        <div className="sb-card p-6 text-center mb-5">
          <div className="w-16 h-16 bg-warning/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <Star className="w-8 h-8 text-warning" fill="currentColor" />
          </div>
          <p className="text-3xl font-bold text-foreground">{points.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">points de fidélité</p>

          <div className="mt-4">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>{points} pts</span>
              <span>{nextReward} pts — Prochain cadeau 🎁</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-warning rounded-full transition-all duration-700" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        <h3 className="font-bold text-foreground text-sm mb-3">Historique des points</h3>
        <div className="space-y-2">
          {history.map((h, i) => (
            <div key={i} className="sb-card p-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">{h.label}</p>
                <p className="text-xs text-muted-foreground">{h.date}</p>
              </div>
              <span className="text-sm font-bold text-success">+{h.points}</span>
            </div>
          ))}
        </div>
      </div>
    </UserLayout>
  );
};

export default LoyaltyScreen;

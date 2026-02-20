import { useStore } from '@/store/useStore';
import { Copy, Share2, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import UserLayout from '@/layouts/UserLayout';

const ReferralScreen = () => {
  const { currentUser } = useStore();
  const code = currentUser?.referralCode || 'SB-ALPHA-2847';

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    toast.success('Code copié ! 📋');
  };

  return (
    <UserLayout>
      <div className="px-4 pt-6">
        <h1 className="text-xl font-bold text-foreground mb-5">Parrainage 🎁</h1>

        <div className="sb-card p-6 text-center mb-5">
          <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Gift className="w-8 h-8 text-accent" />
          </div>
          <p className="text-sm text-muted-foreground mb-3">Ton code de parrainage</p>
          <div className="bg-muted rounded-lg px-4 py-3 font-mono text-lg font-bold text-foreground tracking-wider">
            {code}
          </div>
          <div className="flex gap-3 mt-4">
            <Button variant="outline" className="flex-1 gap-2" onClick={copyCode}>
              <Copy className="w-4 h-4" /> Copier
            </Button>
            <Button className="flex-1 gap-2" onClick={copyCode}>
              <Share2 className="w-4 h-4" /> Partager
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="sb-card p-4 text-center">
            <p className="text-2xl font-bold text-foreground">3</p>
            <p className="text-xs text-muted-foreground mt-1">Filleuls parrainés</p>
          </div>
          <div className="sb-card p-4 text-center">
            <p className="text-2xl font-bold text-primary">1 500 FCFA</p>
            <p className="text-xs text-muted-foreground mt-1">Réductions gagnées</p>
          </div>
        </div>

        <div className="sb-card p-4">
          <h3 className="font-bold text-foreground text-sm mb-2">Comment ça marche ?</h3>
          <div className="space-y-3">
            {[
              { step: '1', text: 'Partage ton code avec tes amis' },
              { step: '2', text: 'Ils l\'utilisent lors de leur inscription' },
              { step: '3', text: 'Vous recevez tous les deux 500 FCFA de réduction' },
            ].map(s => (
              <div key={s.step} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[10px] font-bold text-primary-foreground">{s.step}</span>
                </div>
                <p className="text-sm text-foreground">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default ReferralScreen;

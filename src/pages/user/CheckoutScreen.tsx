import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CheckoutScreen = () => {
  const navigate = useNavigate();
  const { cart } = useStore();
  const [note, setNote] = useState('');

  const subtotal = cart.reduce((s, c) => {
    const price = c.quality === 'premium' ? c.product.premiumPrice : c.product.standardPrice;
    return s + price * c.quantity;
  }, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 pt-6 pb-8">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)}><ArrowLeft className="w-5 h-5 text-foreground" /></button>
          <h1 className="text-xl font-bold text-foreground">Récapitulatif</h1>
        </div>

        <div className="sb-card p-4 space-y-3 mb-5">
          {cart.map(item => {
            const price = item.quality === 'premium' ? item.product.premiumPrice : item.product.standardPrice;
            return (
              <div key={item.product.id} className="flex justify-between text-sm">
                <span className="text-foreground">{item.product.name} <span className="text-muted-foreground">×{item.quantity}</span></span>
                <span className="font-semibold">{(price * item.quantity).toLocaleString()} FCFA</span>
              </div>
            );
          })}
          <div className="border-t border-border pt-2 flex justify-between">
            <span className="font-bold">Total</span>
            <span className="font-bold text-primary">{(subtotal + 500).toLocaleString()} FCFA</span>
          </div>
        </div>

        <div className="mb-5">
          <label className="text-sm font-medium text-foreground mb-1.5 block">Ajouter une note (couleur, préférence...)</label>
          <Input
            placeholder="Ex: Cahiers à couverture bleue..."
            value={note}
            onChange={e => setNote(e.target.value)}
            className="sb-input-focus"
          />
        </div>

        <div className="sb-card p-4 mb-5 flex items-center gap-3">
          <span className="text-2xl">🚚</span>
          <div>
            <p className="font-semibold text-foreground text-sm">Livraison estimée sous 24-48h</p>
            <p className="text-xs text-muted-foreground">Frais de livraison: 500 FCFA</p>
          </div>
        </div>

        <Button size="lg" className="w-full" onClick={() => navigate('/app/delivery', { state: { note } })}>
          Procéder au paiement →
        </Button>
      </div>
    </div>
  );
};

export default CheckoutScreen;

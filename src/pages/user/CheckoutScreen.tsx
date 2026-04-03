import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/LoadingComponents';

const CheckoutScreen = () => {
  const navigate = useNavigate();
  const { cart } = useStore();
  const [note, setNote] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cart.reduce((s, c) => {
    const price = c.quality === 'premium' ? c.product.premiumPrice : c.product.standardPrice;
    return s + price * c.quantity;
  }, 0);
  const total = subtotal + 500;

  const handleProceed = async () => {
    setIsProcessing(true);
    // Simulate validation delay
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/app/delivery', { state: { note } });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 pt-6 pb-8">
        <div className="flex items-center gap-3 mb-6">
          <button 
            onClick={() => navigate(-1)}
            disabled={isProcessing}
            className="w-9 h-9 sb-card rounded-full flex items-center justify-center hover:shadow-md transition-all disabled:opacity-50"
          >
            <ArrowLeft className="w-4 h-4 text-foreground" />
          </button>
          <h1 className="text-xl font-extrabold text-foreground">Récapitulatif</h1>
        </div>

        <div className="sb-card p-4 space-y-3 mb-5">
          {cart.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">Votre panier est vide</p>
          ) : (
            <>
              {cart.map(item => {
                const price = item.quality === 'premium' ? item.product.premiumPrice : item.product.standardPrice;
                return (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-foreground">
                      {item.product.name} <span className="text-muted-foreground">×{item.quantity}</span>
                    </span>
                    <span className="font-semibold">{(price * item.quantity).toLocaleString()} FCFA</span>
                  </div>
                );
              })}
              <div className="border-t border-border pt-2 flex justify-between">
                <span className="font-bold">Sous-total</span>
                <span className="font-bold text-primary">{subtotal.toLocaleString()} FCFA</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Frais de livraison</span>
                <span className="font-semibold text-accent">+500 FCFA</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between">
                <span className="font-extrabold text-lg">Total</span>
                <span className="font-extrabold text-lg text-primary">{total.toLocaleString()} FCFA</span>
              </div>
            </>
          )}
        </div>

        <div className="mb-5">
          <label className="text-sm font-semibold text-foreground mb-1.5 block">Ajouter une note optionnelle</label>
          <Input
            placeholder="Ex: Cahiers à couverture bleue, préférences..." 
            value={note}
            onChange={e => setNote(e.target.value)}
            disabled={isProcessing}
            className="sb-input-focus"
            maxLength={200}
          />
          <p className="text-xs text-muted-foreground mt-1">{note.length}/200</p>
        </div>

        <div className="sb-card p-4 mb-5 flex items-center gap-3 bg-gradient-to-br from-primary/5 to-accent/5">
          <span className="text-2xl">🚚</span>
          <div>
            <p className="font-semibold text-foreground text-sm">Livraison estimée</p>
            <p className="text-xs text-muted-foreground">Sous 24-48 heures dans votre zone</p>
          </div>
        </div>

        <Button 
          size="lg" 
          className="w-full h-12 font-bold sb-glow-primary" 
          onClick={handleProceed}
          disabled={cart.length === 0 || isProcessing}
        >
          {isProcessing ? (
            <div className="flex items-center gap-2">
              <Spinner size="sm" />
              <span>Vérification...</span>
            </div>
          ) : (
            'Procéder au paiement →'
          )}
        </Button>
      </div>
    </div>
  );
};

export default CheckoutScreen;

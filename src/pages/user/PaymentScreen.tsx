import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { ArrowLeft, CheckCircle, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const paymentMethods = [
  { id: 'momo', label: 'MTN MoMo', icon: '📱' },
  { id: 'moov', label: 'Moov Money', icon: '📱' },
  { id: 'wave', label: 'Wave', icon: '📱' },
  { id: 'orange', label: 'Orange Money', icon: '📱' },
  { id: 'cash', label: 'Payer à la livraison', icon: '💵' },
];

const PaymentScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { note = '', address = '' } = (location.state as any) || {};
  const { cart, placeOrder } = useStore();
  const [method, setMethod] = useState('');
  const [phone, setPhone] = useState('');
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  const subtotal = cart.reduce((s, c) => {
    const price = c.quality === 'premium' ? c.product.premiumPrice : c.product.standardPrice;
    return s + price * c.quantity;
  }, 0);
  const total = subtotal + 500;

  const isMobile = method && method !== 'cash';

  const handlePay = () => {
    if (!method) {
      toast.error('Choisis un mode de paiement');
      return;
    }
    const id = placeOrder(method, address, note);
    setOrderId(id);
    setSuccess(true);
    toast.success('Paiement confirmé ! 🎉');
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center">
        <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mb-6 sb-animate-box-open">
          <CheckCircle className="w-10 h-10 text-success" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Commande confirmée ! 🎉</h2>
        <p className="text-muted-foreground mb-1">Votre box est en préparation</p>
        <p className="text-sm font-mono text-accent font-bold mb-8">{orderId}</p>
        <Button size="lg" className="w-full max-w-xs" onClick={() => navigate('/app/tracking/' + orderId)}>
          Suivre ma commande
        </Button>
        <Button variant="ghost" className="mt-3" onClick={() => navigate('/app/home')}>
          Retour à l'accueil
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 pt-6 pb-8">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)}><ArrowLeft className="w-5 h-5 text-foreground" /></button>
        <h1 className="text-xl font-bold text-foreground">Mode de paiement</h1>
      </div>

      <div className="space-y-3 mb-6">
        {paymentMethods.map(pm => (
          <button
            key={pm.id}
            onClick={() => setMethod(pm.id)}
            className={`sb-card p-4 w-full text-left flex items-center gap-3 transition-all ${
              method === pm.id ? 'ring-2 ring-primary shadow-md' : ''
            }`}
          >
            <span className="text-2xl">{pm.icon}</span>
            <span className="font-semibold text-foreground">{pm.label}</span>
            {method === pm.id && <CheckCircle className="w-5 h-5 text-primary ml-auto" />}
          </button>
        ))}
      </div>

      {isMobile && (
        <div className="mb-6">
          <label className="text-sm font-medium text-foreground mb-1.5 block">Numéro de téléphone</label>
          <Input
            type="tel"
            placeholder="+229 00 00 00 00"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="sb-input-focus"
          />
        </div>
      )}

      <Button size="lg" className="w-full" onClick={handlePay} disabled={!method}>
        Confirmer et payer — {total.toLocaleString()} FCFA
      </Button>
    </div>
  );
};

export default PaymentScreen;

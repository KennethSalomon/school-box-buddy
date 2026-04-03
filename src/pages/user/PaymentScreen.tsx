import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useStore } from '@/store/useStore';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, CheckCircle, CreditCard, Banknote, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const paymentMethods = [
  { id: 'momo', label: 'MTN MoMo', icon: '📱', desc: 'Paiement mobile MTN' },
  { id: 'moov', label: 'Moov Money', icon: '📱', desc: 'Paiement mobile Moov' },
  { id: 'wave', label: 'Wave', icon: '📱', desc: 'Paiement Wave' },
  { id: 'orange', label: 'Orange Money', icon: '📱', desc: 'Paiement Orange' },
  { id: 'fedapay', label: 'FedaPay', icon: '💳', desc: 'Carte bancaire / Mobile' },
  { id: 'cash', label: 'Payer à la livraison', icon: '💵', desc: 'Espèces à la réception' },
];

const PaymentScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { note = '', address = '' } = (location.state as any) || {};
  const { cart, clearCart } = useStore();
  const { user, profile } = useAuth();
  const [method, setMethod] = useState('');
  const [phone, setPhone] = useState('');
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [processing, setProcessing] = useState(false);

  const subtotal = cart.reduce((s, c) => {
    const price = c.quality === 'premium' ? c.product.premiumPrice : c.product.standardPrice;
    return s + price * c.quantity;
  }, 0);
  const total = subtotal + 500;

  const isMobile = method && method !== 'cash' && method !== 'fedapay';

  const handlePay = async () => {
    if (!method) {
      toast.error('Choisis un mode de paiement');
      return;
    }
    if (!user) {
      toast.error('Connecte-toi pour passer commande');
      return;
    }

    setProcessing(true);
    const orderNumber = `ORD-${Date.now()}`;

    try {
      // Create order in database
      const { data: order, error: orderError } = await supabase.from('orders').insert({
        user_id: user.id,
        order_number: orderNumber,
        status: method === 'cash' ? 'pending' : 'pending',
        payment_method: method,
        delivery_address: address,
        delivery_fee: 500,
        subtotal,
        total,
        note,
        client_name: `${profile?.first_name || ''} ${profile?.last_name || ''}`.trim(),
        client_phone: profile?.phone || '',
        client_email: user.email || '',
      }).select().single();

      if (orderError) throw orderError;

      // Insert order items
      const items = cart.map(c => ({
        order_id: order.id,
        product_id: c.product.id,
        product_name: c.product.name,
        quality: c.quality,
        quantity: c.quantity,
        unit_price: c.quality === 'premium' ? c.product.premiumPrice : c.product.standardPrice,
      }));

      const { error: itemsError } = await supabase.from('order_items').insert(items);
      if (itemsError) throw itemsError;

      clearCart();
      setOrderId(orderNumber);
      setSuccess(true);
      toast.success('Commande confirmée ! 🎉');
    } catch (err: any) {
      console.error('Order error:', err);
      toast.error('Erreur lors de la commande. Réessaie.');
    } finally {
      setProcessing(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center">
        <div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mb-6 sb-animate-box-open sb-glow-accent">
          <CheckCircle className="w-12 h-12 text-success" />
        </div>
        <h2 className="text-2xl font-extrabold text-foreground mb-2">Commande confirmée ! 🎉</h2>
        <p className="text-muted-foreground mb-1">Votre box est en préparation</p>
        <p className="text-sm font-mono text-accent font-bold mb-8 bg-accent/10 px-4 py-2 rounded-full">{orderId}</p>
        <Button size="lg" className="w-full max-w-xs h-12 sb-glow-primary font-semibold" onClick={() => navigate('/app/orders')}>
          Voir mes commandes
        </Button>
        <Button variant="ghost" className="mt-3 font-medium" onClick={() => navigate('/app/home')}>
          Retour à l'accueil
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 pt-6 pb-8">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="w-9 h-9 sb-card rounded-full flex items-center justify-center">
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </button>
        <h1 className="text-xl font-extrabold text-foreground">Mode de paiement</h1>
      </div>

      <div className="space-y-3 mb-6">
        {paymentMethods.map(pm => (
          <button
            key={pm.id}
            onClick={() => setMethod(pm.id)}
            className={`sb-card p-4 w-full text-left flex items-center gap-3 transition-all duration-300 ${
              method === pm.id ? 'ring-2 ring-primary sb-glow-primary' : 'hover:shadow-md'
            }`}
          >
            <span className="text-2xl">{pm.icon}</span>
            <div className="flex-1">
              <span className="font-bold text-foreground block text-sm">{pm.label}</span>
              <span className="text-xs text-muted-foreground">{pm.desc}</span>
            </div>
            {method === pm.id && <CheckCircle className="w-5 h-5 text-primary" />}
          </button>
        ))}
      </div>

      {isMobile && (
        <div className="mb-6">
          <label className="text-sm font-semibold text-foreground mb-1.5 block">Numéro de téléphone</label>
          <Input
            type="tel"
            placeholder="+229 00 00 00 00"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="sb-input-focus h-12"
          />
        </div>
      )}

      <Button size="lg" className="w-full h-12 sb-glow-primary font-bold text-base" onClick={handlePay} disabled={!method || processing}>
        {processing ? (
          <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
        ) : (
          `Confirmer et payer — ${total.toLocaleString()} FCFA`
        )}
      </Button>
    </div>
  );
};

export default PaymentScreen;

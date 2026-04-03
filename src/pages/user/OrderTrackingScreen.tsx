import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, MessageCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const steps = [
  { key: 'pending', label: 'Commande confirmée', icon: '✓' },
  { key: 'preparing', label: 'En préparation', icon: '📦' },
  { key: 'delivering', label: 'En livraison', icon: '🚚' },
  { key: 'delivered', label: 'Livrée', icon: '🎉' },
];

const statusIndex: Record<string, number> = { pending: 0, preparing: 1, delivering: 2, delivered: 3, cancelled: -1 };

const OrderTrackingScreen = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !orderId) return;
    const fetch = async () => {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('order_number', orderId)
          .single();
        if (error) throw error;
        setOrder(data);
      } catch (error) {
        console.error('Error fetching order tracking:', error);
        toast.error('Erreur lors de la récupération de la commande');
      } finally {
        setLoading(false);
      }
    };
    fetch();

    // Realtime
    const channel = supabase
      .channel(`order-${orderId}`)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'orders' }, (payload) => {
        if (payload.new && (payload.new as any).order_number === orderId) {
          setOrder(payload.new);
        }
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [user, orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-accent/30 border-t-accent rounded-full animate-spin" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-muted-foreground px-6">
        <p className="font-medium">Commande introuvable</p>
        <Button variant="ghost" className="mt-4" onClick={() => navigate('/app/orders')}>Retour</Button>
      </div>
    );
  }

  const currentStep = statusIndex[order.status] ?? 0;

  return (
    <div className="min-h-screen bg-background px-4 pt-6 pb-8">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="w-9 h-9 sb-card rounded-full flex items-center justify-center">
          <ArrowLeft className="w-4 h-4 text-foreground" />
        </button>
        <div>
          <h1 className="text-lg font-extrabold text-foreground">Suivi de commande</h1>
          <p className="text-xs text-muted-foreground font-mono">{order.order_number}</p>
        </div>
      </div>

      {order.status === 'cancelled' ? (
        <div className="sb-card p-6 text-center">
          <span className="text-4xl mb-3 block">❌</span>
          <h3 className="font-extrabold text-foreground text-lg">Commande annulée</h3>
        </div>
      ) : (
        <div className="sb-card p-6">
          <div className="space-y-0">
            {steps.map((s, i) => {
              const done = i <= currentStep;
              const active = i === currentStep;
              return (
                <div key={s.key} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      done ? 'sb-gradient-primary text-primary-foreground sb-glow-primary' : 'bg-muted text-muted-foreground'
                    } ${active ? 'sb-animate-pulse-dot' : ''}`}>
                      {s.icon}
                    </div>
                    {i < steps.length - 1 && (
                      <div className={`w-0.5 h-10 transition-all ${done ? 'bg-primary' : 'bg-muted'}`} />
                    )}
                  </div>
                  <div className="pt-1.5">
                    <p className={`text-sm font-bold ${done ? 'text-foreground' : 'text-muted-foreground'}`}>{s.label}</p>
                    {active && order.status !== 'delivered' && (
                      <p className="text-xs text-accent font-semibold mt-0.5">En cours...</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {order.status !== 'delivered' && (
            <div className="mt-6 p-4 bg-muted rounded-xl text-center">
              <p className="text-sm text-muted-foreground font-medium">Arrivée estimée</p>
              <p className="text-xl font-extrabold text-foreground">24 — 48h</p>
            </div>
          )}
        </div>
      )}

      <Button variant="outline" className="w-full mt-5 gap-2 h-11 font-semibold" onClick={() => window.open('https://wa.me/22997452310', '_blank')}>
        <MessageCircle className="w-4 h-4" /> Contacter le support <ExternalLink className="w-3 h-3" />
      </Button>
    </div>
  );
};

export default OrderTrackingScreen;

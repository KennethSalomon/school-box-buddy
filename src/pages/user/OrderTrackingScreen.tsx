import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  const { orders } = useStore();
  const order = orders.find(o => o.id === orderId);

  if (!order) return <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">Commande introuvable</div>;

  const currentStep = statusIndex[order.status] ?? 0;

  return (
    <div className="min-h-screen bg-background px-4 pt-6 pb-8">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)}><ArrowLeft className="w-5 h-5 text-foreground" /></button>
        <div>
          <h1 className="text-lg font-bold text-foreground">Suivi de commande</h1>
          <p className="text-xs text-muted-foreground font-mono">{order.id}</p>
        </div>
      </div>

      {order.status === 'cancelled' ? (
        <div className="sb-card p-6 text-center">
          <span className="text-4xl mb-3 block">❌</span>
          <h3 className="font-bold text-foreground text-lg">Commande annulée</h3>
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
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      done ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    } ${active ? 'sb-animate-pulse-dot' : ''}`}>
                      {s.icon}
                    </div>
                    {i < steps.length - 1 && (
                      <div className={`w-0.5 h-10 ${done ? 'bg-primary' : 'bg-muted'}`} />
                    )}
                  </div>
                  <div className="pt-1">
                    <p className={`text-sm font-semibold ${done ? 'text-foreground' : 'text-muted-foreground'}`}>{s.label}</p>
                    {active && order.status !== 'delivered' && (
                      <p className="text-xs text-accent font-medium mt-0.5">En cours...</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {order.status !== 'delivered' && (
            <div className="mt-6 p-3 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Arrivée estimée</p>
              <p className="text-lg font-bold text-foreground">24 — 48h</p>
            </div>
          )}
        </div>
      )}

      <Button variant="outline" className="w-full mt-5 gap-2">
        <MessageCircle className="w-4 h-4" /> Contacter le support
      </Button>
    </div>
  );
};

export default OrderTrackingScreen;

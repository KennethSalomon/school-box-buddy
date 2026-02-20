import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UserLayout from '@/layouts/UserLayout';

const statusColors: Record<string, string> = {
  pending: 'bg-warning text-warning-foreground',
  preparing: 'bg-accent text-accent-foreground',
  delivering: 'bg-accent text-accent-foreground',
  delivered: 'bg-success text-success-foreground',
  cancelled: 'bg-destructive text-destructive-foreground',
};

const statusLabels: Record<string, string> = {
  pending: 'En attente',
  preparing: 'En préparation',
  delivering: 'En livraison',
  delivered: 'Livrée',
  cancelled: 'Annulée',
};

const OrderHistoryScreen = () => {
  const navigate = useNavigate();
  const { orders } = useStore();
  const userOrders = orders.filter(o => o.userId === 'current' || o.userId === 'user-1');

  return (
    <UserLayout>
      <div className="px-4 pt-6">
        <h1 className="text-xl font-bold text-foreground mb-5">Mes commandes</h1>

        {userOrders.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Aucune commande pour le moment</p>
            <Button className="mt-4" onClick={() => navigate('/app/search')}>Commander maintenant</Button>
          </div>
        ) : (
          <div className="space-y-3">
            {userOrders.map(o => (
              <div key={o.id} className="sb-card p-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate(`/app/tracking/${o.id}`)}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-muted-foreground">{o.id}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusColors[o.status]}`}>
                    {statusLabels[o.status]}
                  </span>
                </div>
                <p className="text-sm font-semibold text-foreground">{o.items.length} articles</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-muted-foreground">{new Date(o.createdAt).toLocaleDateString('fr-FR')}</span>
                  <span className="font-bold text-primary text-sm">{(o.total + o.deliveryFee).toLocaleString()} FCFA</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </UserLayout>
  );
};

export default OrderHistoryScreen;

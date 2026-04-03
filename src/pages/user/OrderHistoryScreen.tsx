import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UserLayout from '@/layouts/UserLayout';

const statusColors: Record<string, string> = {
  pending: 'bg-warning/10 text-warning border border-warning/20',
  preparing: 'bg-accent/10 text-accent border border-accent/20',
  delivering: 'bg-accent/10 text-accent border border-accent/20',
  delivered: 'bg-success/10 text-success border border-success/20',
  cancelled: 'bg-destructive/10 text-destructive border border-destructive/20',
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
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchOrders = async () => {
      const { data } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      setOrders(data || []);
      setLoading(false);
    };
    fetchOrders();

    // Realtime updates
    const channel = supabase
      .channel('user-orders')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders', filter: `user_id=eq.${user.id}` }, () => {
        fetchOrders();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [user]);

  return (
    <UserLayout>
      <div className="px-4 pt-6">
        <h1 className="text-xl font-extrabold text-foreground mb-5">Mes commandes</h1>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-3 border-accent/30 border-t-accent rounded-full animate-spin" />
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-muted rounded-3xl flex items-center justify-center mx-auto mb-4">
              <Package className="w-10 h-10 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground font-medium">Aucune commande pour le moment</p>
            <Button className="mt-4 sb-glow-primary" onClick={() => navigate('/app/search')}>Commander maintenant</Button>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map(o => (
              <div key={o.id} className="sb-card-hover p-4 cursor-pointer" onClick={() => navigate(`/app/tracking/${o.order_number}`)}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-muted-foreground">{o.order_number}</span>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${statusColors[o.status]}`}>
                    {statusLabels[o.status] || o.status}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-muted-foreground">{new Date(o.created_at).toLocaleDateString('fr-FR')}</span>
                  <span className="font-extrabold text-primary text-sm">{o.total?.toLocaleString()} FCFA</span>
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

import { Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { useCloverStore } from '@/store/useCloverStore';

const statusConfig = {
  confirmed: { label: 'Confirmée', icon: CheckCircle, color: 'text-primary' },
  preparing: { label: 'En préparation', icon: Clock, color: 'text-yellow-500' },
  shipped: { label: 'Expédiée', icon: Truck, color: 'text-blue-500' },
  delivered: { label: 'Livrée', icon: Package, color: 'text-primary' },
};

const ProfilePage = () => {
  const orders = useCloverStore((s) => s.orders);

  return (
    <div className="min-h-screen pt-20 pb-32 px-4">
      <div className="container max-w-2xl">
        {/* Avatar */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-foreground text-background rounded-full flex items-center justify-center text-2xl font-display font-bold mx-auto mb-4">
            C
          </div>
          <h1 className="text-2xl font-display font-bold">Mon Profil</h1>
          <p className="text-muted-foreground text-sm mt-1">Gérez vos commandes et votre compte</p>
        </div>

        {/* Orders */}
        <h2 className="text-xl font-display font-bold mb-4">Mes commandes</h2>

        {orders.length === 0 ? (
          <p className="text-muted-foreground text-center py-10">Aucune commande pour le moment.</p>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => {
              const cfg = statusConfig[order.status];
              const Icon = cfg.icon;
              return (
                <div key={order.id} className="bg-secondary rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-display font-bold text-sm">{order.id}</span>
                    <span className={`flex items-center gap-1 text-xs font-semibold ${cfg.color}`}>
                      <Icon size={14} /> {cfg.label}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{order.date}</span>
                    <span className="font-display font-bold text-foreground">{order.total} €</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;

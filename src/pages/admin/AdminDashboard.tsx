import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { ShoppingCart, DollarSign, UserPlus, Clock, Eye, Plus, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AdminLayout from '@/layouts/AdminLayout';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { orders } = useStore();

  const today = orders.filter(o => {
    const d = new Date(o.createdAt);
    const now = new Date();
    return d.toDateString() === now.toDateString();
  });

  const pendingCount = orders.filter(o => o.status === 'pending').length;
  const totalRevenue = orders.filter(o => o.status !== 'cancelled').reduce((s, o) => s + o.total + o.deliveryFee, 0);

  const kpis = [
    { label: 'Commandes aujourd\'hui', value: today.length || 5, icon: ShoppingCart, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'CA aujourd\'hui', value: `${(totalRevenue).toLocaleString()} FCFA`, icon: DollarSign, color: 'text-success', bg: 'bg-success/10' },
    { label: 'Nouveaux inscrits', value: 3, icon: UserPlus, color: 'text-accent', bg: 'bg-accent/10' },
    { label: 'En attente', value: pendingCount, icon: Clock, color: pendingCount > 0 ? 'text-warning' : 'text-muted-foreground', bg: pendingCount > 0 ? 'bg-warning/10' : 'bg-muted' },
  ];

  const recentOrders = orders.slice(0, 5);

  const statusLabels: Record<string, string> = { pending: 'En attente', preparing: 'En préparation', delivering: 'En livraison', delivered: 'Livrée', cancelled: 'Annulée' };
  const statusColors: Record<string, string> = { pending: 'bg-warning text-warning-foreground', preparing: 'bg-accent text-accent-foreground', delivered: 'bg-success text-success-foreground', cancelled: 'bg-destructive text-destructive-foreground', delivering: 'bg-accent text-accent-foreground' };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {kpis.map(k => (
            <div key={k.label} className="sb-card p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 ${k.bg} rounded-xl flex items-center justify-center`}>
                  <k.icon className={`w-5 h-5 ${k.color}`} />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{k.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{k.label}</p>
            </div>
          ))}
        </div>

        {/* Solde */}
        <div className="sb-card p-6 bg-success/5 border-success/20">
          <p className="text-sm text-muted-foreground mb-1">Solde disponible</p>
          <p className="text-3xl font-bold text-success">{totalRevenue.toLocaleString()} FCFA</p>
        </div>

        {/* Quick actions */}
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => navigate('/admin/orders')} className="gap-2"><Eye className="w-4 h-4" /> Voir les commandes</Button>
          <Button variant="outline" onClick={() => navigate('/admin/catalog')} className="gap-2"><Plus className="w-4 h-4" /> Ajouter un article</Button>
          <Button variant="outline" onClick={() => navigate('/admin/schools')} className="gap-2"><GraduationCap className="w-4 h-4" /> Gérer les écoles</Button>
        </div>

        {/* Recent orders */}
        <div className="sb-card overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="font-bold text-foreground">Commandes récentes</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-3 font-semibold text-muted-foreground">N°</th>
                  <th className="text-left p-3 font-semibold text-muted-foreground">Client</th>
                  <th className="text-left p-3 font-semibold text-muted-foreground">Montant</th>
                  <th className="text-left p-3 font-semibold text-muted-foreground">Statut</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(o => (
                  <tr key={o.id} className="border-t border-border hover:bg-muted/30 cursor-pointer" onClick={() => navigate('/admin/orders')}>
                    <td className="p-3 font-mono text-xs">{o.id}</td>
                    <td className="p-3 font-medium">{o.clientName}</td>
                    <td className="p-3 font-semibold text-primary">{(o.total + o.deliveryFee).toLocaleString()}</td>
                    <td className="p-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusColors[o.status]}`}>
                        {statusLabels[o.status]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;

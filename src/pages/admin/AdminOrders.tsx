import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { Search, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import AdminLayout from '@/layouts/AdminLayout';
import type { Order } from '@/data/types';

const statusLabels: Record<string, string> = { pending: 'En attente', preparing: 'En préparation', delivering: 'En livraison', delivered: 'Livrée', cancelled: 'Annulée' };
const statusColors: Record<string, string> = { pending: 'bg-warning text-warning-foreground', preparing: 'bg-accent text-accent-foreground', delivered: 'bg-success text-success-foreground', cancelled: 'bg-destructive text-destructive-foreground', delivering: 'bg-accent text-accent-foreground' };

const AdminOrders = () => {
  const { orders, updateOrderStatus } = useStore();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filtered = orders.filter(o => {
    if (filter !== 'all' && o.status !== filter) return false;
    if (search && !o.clientName.toLowerCase().includes(search.toLowerCase()) && !o.id.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleStatusChange = (orderId: string, status: Order['status']) => {
    updateOrderStatus(orderId, status);
    toast.success('Statut mis à jour');
  };

  return (
    <AdminLayout>
      <div className="space-y-5">
        <h1 className="text-2xl font-bold text-foreground">Commandes</h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {[['all', 'Toutes'], ['pending', 'En attente'], ['preparing', 'En préparation'], ['delivered', 'Livrée'], ['cancelled', 'Annulée']].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${filter === key ? 'bg-primary text-primary-foreground' : 'bg-card text-foreground border border-border'}`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Chercher par nom ou N°..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 sb-input-focus" />
        </div>

        {/* Table */}
        <div className="sb-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-3 font-semibold text-muted-foreground">N° commande</th>
                  <th className="text-left p-3 font-semibold text-muted-foreground">Date</th>
                  <th className="text-left p-3 font-semibold text-muted-foreground">Client</th>
                  <th className="text-left p-3 font-semibold text-muted-foreground">École</th>
                  <th className="text-left p-3 font-semibold text-muted-foreground">Montant</th>
                  <th className="text-left p-3 font-semibold text-muted-foreground">Paiement</th>
                  <th className="text-left p-3 font-semibold text-muted-foreground">Statut</th>
                  <th className="text-left p-3 font-semibold text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(o => (
                  <tr key={o.id} className="border-t border-border hover:bg-muted/30">
                    <td className="p-3 font-mono text-xs">{o.id}</td>
                    <td className="p-3 text-xs text-muted-foreground">{new Date(o.createdAt).toLocaleDateString('fr-FR')}</td>
                    <td className="p-3 font-medium">{o.clientName}</td>
                    <td className="p-3 text-xs">{o.school} — {o.class}</td>
                    <td className="p-3 font-semibold text-primary">{(o.total + o.deliveryFee).toLocaleString()}</td>
                    <td className="p-3 text-xs capitalize">{o.paymentMethod}</td>
                    <td className="p-3">
                      <select
                        value={o.status}
                        onChange={e => handleStatusChange(o.id, e.target.value as Order['status'])}
                        className="text-xs font-semibold px-2 py-1 rounded-lg bg-muted border-0 text-foreground"
                      >
                        {Object.entries(statusLabels).map(([k, v]) => (
                          <option key={k} value={k}>{v}</option>
                        ))}
                      </select>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-1">
                        <button onClick={() => setSelectedOrder(o)} className="text-xs text-primary font-semibold hover:underline">Détails</button>
                        <button className="text-xs text-muted-foreground hover:underline ml-2"><FileText className="w-3 h-3 inline" /> PDF</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order detail modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-foreground/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedOrder(null)}>
            <div className="bg-card rounded-card p-6 max-w-lg w-full max-h-[80vh] overflow-auto" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-foreground text-lg">Commande {selectedOrder.id}</h3>
                <button onClick={() => setSelectedOrder(null)} className="text-muted-foreground">✕</button>
              </div>
              <div className="space-y-3 text-sm">
                <div><span className="text-muted-foreground">Client:</span> <span className="font-semibold">{selectedOrder.clientName}</span></div>
                <div><span className="text-muted-foreground">Tél:</span> {selectedOrder.clientPhone}</div>
                <div><span className="text-muted-foreground">Email:</span> {selectedOrder.clientEmail}</div>
                <div><span className="text-muted-foreground">Adresse:</span> {selectedOrder.deliveryAddress}</div>
                {selectedOrder.note && <div><span className="text-muted-foreground">Note:</span> {selectedOrder.note}</div>}
                <hr className="border-border" />
                <h4 className="font-bold">Articles</h4>
                {selectedOrder.items.map((item, i) => (
                  <div key={i} className="flex justify-between">
                    <span>{item.name} ({item.quality}) ×{item.quantity}</span>
                    <span className="font-semibold">{(item.unitPrice * item.quantity).toLocaleString()} FCFA</span>
                  </div>
                ))}
                <hr className="border-border" />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-primary">{(selectedOrder.total + selectedOrder.deliveryFee).toLocaleString()} FCFA</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;

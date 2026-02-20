import { useState } from 'react';
import { sampleUsers } from '@/data/mockData';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import AdminLayout from '@/layouts/AdminLayout';

const AdminUsers = () => {
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<typeof sampleUsers[0] | null>(null);

  const filtered = sampleUsers.filter(u =>
    u.firstName.toLowerCase().includes(search.toLowerCase()) ||
    u.lastName.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-5">
        <h1 className="text-2xl font-bold text-foreground">Utilisateurs</h1>

        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Chercher un utilisateur..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 sb-input-focus" />
        </div>

        <div className="sb-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-3 font-semibold text-muted-foreground">Nom</th>
                  <th className="text-left p-3 font-semibold text-muted-foreground">Téléphone</th>
                  <th className="text-left p-3 font-semibold text-muted-foreground">Email</th>
                  <th className="text-left p-3 font-semibold text-muted-foreground">Inscrit le</th>
                  <th className="text-left p-3 font-semibold text-muted-foreground">Commandes</th>
                  <th className="text-left p-3 font-semibold text-muted-foreground">Total dépensé</th>
                  <th className="text-left p-3 font-semibold text-muted-foreground">Code parrainage</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(u => (
                  <tr key={u.id} className="border-t border-border hover:bg-muted/30 cursor-pointer" onClick={() => setSelectedUser(u)}>
                    <td className="p-3 font-medium">{u.firstName} {u.lastName}</td>
                    <td className="p-3 text-xs">{u.phone}</td>
                    <td className="p-3 text-xs">{u.email}</td>
                    <td className="p-3 text-xs text-muted-foreground">{new Date(u.registeredAt).toLocaleDateString('fr-FR')}</td>
                    <td className="p-3 text-center">{u.ordersCount}</td>
                    <td className="p-3 font-semibold text-primary">{u.totalSpent.toLocaleString()}</td>
                    <td className="p-3 font-mono text-xs">{u.referralCode}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedUser && (
          <div className="fixed inset-0 bg-foreground/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedUser(null)}>
            <div className="bg-card rounded-card p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-foreground text-lg">{selectedUser.firstName} {selectedUser.lastName}</h3>
                <button onClick={() => setSelectedUser(null)} className="text-muted-foreground">✕</button>
              </div>
              <div className="space-y-2 text-sm">
                <div><span className="text-muted-foreground">Email:</span> {selectedUser.email}</div>
                <div><span className="text-muted-foreground">Tél:</span> {selectedUser.phone}</div>
                <div><span className="text-muted-foreground">Ville:</span> {selectedUser.city}</div>
                <div><span className="text-muted-foreground">Inscrit le:</span> {new Date(selectedUser.registeredAt).toLocaleDateString('fr-FR')}</div>
                <div><span className="text-muted-foreground">Commandes:</span> {selectedUser.ordersCount}</div>
                <div><span className="text-muted-foreground">Total dépensé:</span> <span className="font-bold text-primary">{selectedUser.totalSpent.toLocaleString()} FCFA</span></div>
                <div><span className="text-muted-foreground">Code parrainage:</span> <span className="font-mono">{selectedUser.referralCode}</span></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;

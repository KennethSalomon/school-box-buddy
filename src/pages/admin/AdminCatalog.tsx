import { useState } from 'react';
import { products as initialProducts } from '@/data/mockData';
import { Plus, Pencil, Trash2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import AdminLayout from '@/layouts/AdminLayout';

const AdminCatalog = () => {
  const [prods, setProds] = useState(initialProducts);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', category: '', standardPrice: '', premiumPrice: '', stock: '' });

  const handleAdd = () => {
    if (form.name && form.standardPrice) {
      setProds(prev => [...prev, {
        id: `prod-${Date.now()}`,
        name: form.name,
        image: 'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=300&h=300&fit=crop',
        standardPrice: parseInt(form.standardPrice),
        premiumPrice: parseInt(form.premiumPrice) || parseInt(form.standardPrice) * 2,
        category: form.category || 'Divers',
        required: false,
        stock: parseInt(form.stock) || 50,
        applicableClasses: ['6ème', '5ème', '4ème', '3ème'],
      }]);
      setForm({ name: '', category: '', standardPrice: '', premiumPrice: '', stock: '' });
      setShowAdd(false);
      toast.success('Article ajouté !');
    }
  };

  const handleDelete = (id: string) => {
    setProds(prev => prev.filter(p => p.id !== id));
    toast.success('Article supprimé');
  };

  return (
    <AdminLayout>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Catalogue</h1>
          <Button onClick={() => setShowAdd(true)} className="gap-2"><Plus className="w-4 h-4" /> Ajouter</Button>
        </div>

        {showAdd && (
          <div className="sb-card p-5 space-y-3">
            <h3 className="font-bold text-foreground">Nouvel article</h3>
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="Nom" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="sb-input-focus" />
              <Input placeholder="Catégorie" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="sb-input-focus" />
              <Input placeholder="Prix Standard (FCFA)" type="number" value={form.standardPrice} onChange={e => setForm({ ...form, standardPrice: e.target.value })} className="sb-input-focus" />
              <Input placeholder="Prix Premium (FCFA)" type="number" value={form.premiumPrice} onChange={e => setForm({ ...form, premiumPrice: e.target.value })} className="sb-input-focus" />
              <Input placeholder="Stock" type="number" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} className="sb-input-focus" />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAdd}>Enregistrer</Button>
              <Button variant="ghost" onClick={() => setShowAdd(false)}>Annuler</Button>
            </div>
          </div>
        )}

        <div className="sb-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-3 font-semibold text-muted-foreground">Photo</th>
                  <th className="text-left p-3 font-semibold text-muted-foreground">Nom</th>
                  <th className="text-left p-3 font-semibold text-muted-foreground">Catégorie</th>
                  <th className="text-left p-3 font-semibold text-muted-foreground">Std</th>
                  <th className="text-left p-3 font-semibold text-muted-foreground">Premium</th>
                  <th className="text-left p-3 font-semibold text-muted-foreground">Stock</th>
                  <th className="text-left p-3 font-semibold text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {prods.map(p => (
                  <tr key={p.id} className="border-t border-border">
                    <td className="p-3"><img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" /></td>
                    <td className="p-3 font-medium">{p.name}</td>
                    <td className="p-3 text-xs text-muted-foreground">{p.category}</td>
                    <td className="p-3">{p.standardPrice.toLocaleString()}</td>
                    <td className="p-3">{p.premiumPrice.toLocaleString()}</td>
                    <td className="p-3">
                      <span className={`flex items-center gap-1 ${p.stock < 5 ? 'text-destructive font-bold' : ''}`}>
                        {p.stock < 5 && <AlertTriangle className="w-3 h-3" />}
                        {p.stock}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button className="text-accent hover:text-accent/80"><Pencil className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(p.id)} className="text-destructive hover:text-destructive/80"><Trash2 className="w-4 h-4" /></button>
                      </div>
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

export default AdminCatalog;

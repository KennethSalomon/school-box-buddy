import { useState } from 'react';
import { schools as initialSchools, products } from '@/data/mockData';
import { Plus, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import AdminLayout from '@/layouts/AdminLayout';

const AdminSchools = () => {
  const [schoolsList] = useState(initialSchools);
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', city: '', levels: '' });

  const school = schoolsList.find(s => s.id === selectedSchool);

  return (
    <AdminLayout>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Écoles & Classes</h1>
          <Button onClick={() => setShowAdd(!showAdd)} className="gap-2"><Plus className="w-4 h-4" /> Ajouter une école</Button>
        </div>

        {showAdd && (
          <div className="sb-card p-5 space-y-3">
            <Input placeholder="Nom de l'école" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="sb-input-focus" />
            <Input placeholder="Ville" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} className="sb-input-focus" />
            <Input placeholder="Niveaux (séparés par virgule)" value={form.levels} onChange={e => setForm({ ...form, levels: e.target.value })} className="sb-input-focus" />
            <Button onClick={() => { setShowAdd(false); toast.success('École ajoutée !'); }}>Enregistrer</Button>
          </div>
        )}

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {schoolsList.map(s => (
            <div key={s.id} className="sb-card p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-bold text-foreground">{s.name}</h3>
                  <p className="text-xs text-muted-foreground">{s.city}</p>
                </div>
                <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full font-semibold">
                  {s.classes.length} classes
                </span>
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {s.classes.map(c => (
                  <span key={c} className="text-[10px] bg-muted px-2 py-0.5 rounded-full font-medium text-muted-foreground">{c}</span>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full gap-2" onClick={() => setSelectedSchool(s.id)}>
                <Settings className="w-3 h-3" /> Gérer les listes
              </Button>
            </div>
          ))}
        </div>

        {selectedSchool && school && (
          <div className="fixed inset-0 bg-foreground/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedSchool(null)}>
            <div className="bg-card rounded-card p-6 max-w-2xl w-full max-h-[80vh] overflow-auto" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-foreground text-lg">{school.name} — Listes de fournitures</h3>
                <button onClick={() => setSelectedSchool(null)} className="text-muted-foreground">✕</button>
              </div>
              {school.classes.map(cls => {
                const classProds = products.filter(p => p.applicableClasses.includes(cls));
                return (
                  <div key={cls} className="mb-4">
                    <h4 className="font-bold text-foreground text-sm mb-2">{cls}</h4>
                    <div className="space-y-1">
                      {classProds.map(p => (
                        <div key={p.id} className="flex items-center justify-between py-1.5 px-3 bg-muted/50 rounded-lg text-sm">
                          <span>{p.name}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${p.required ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                            {p.required ? 'Obligatoire' : 'Optionnel'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminSchools;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { products } from '@/data/mockData';
import { ArrowLeft, Package, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

type Filter = 'all' | 'required' | 'optional';

const CatalogScreen = () => {
  const navigate = useNavigate();
  const { selectedSchool, selectedClass, addToCart, cart } = useStore();
  const [filter, setFilter] = useState<Filter>('all');
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [qualities, setQualities] = useState<Record<string, 'standard' | 'premium'>>({});

  const classProducts = products.filter(p =>
    selectedClass ? p.applicableClasses.includes(selectedClass) : true
  );

  const filtered = classProducts.filter(p => {
    if (filter === 'required') return p.required;
    if (filter === 'optional') return !p.required;
    return true;
  });

  const getQty = (id: string) => quantities[id] || 1;
  const getQuality = (id: string) => qualities[id] || 'standard';
  const setQty = (id: string, q: number) => setQuantities(prev => ({ ...prev, [id]: Math.max(1, q) }));
  const setQuality = (id: string, q: 'standard' | 'premium') => setQualities(prev => ({ ...prev, [id]: q }));

  const handleAdd = (product: typeof products[0]) => {
    addToCart(product, getQuality(product.id), getQty(product.id));
    toast.success(`${product.name} ajouté à ta box ! 📦`);
  };

  const cartCount = cart.reduce((s, c) => s + c.quantity, 0);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sb-gradient-hero px-4 pt-6 pb-5 rounded-b-[24px]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="text-secondary-foreground"><ArrowLeft className="w-5 h-5" /></button>
            <div>
              <h1 className="text-lg font-bold text-secondary-foreground">Fournitures</h1>
              <p className="text-xs text-secondary-foreground/60">{selectedSchool} — {selectedClass}</p>
            </div>
          </div>
          <button onClick={() => navigate('/app/box')} className="relative w-10 h-10 bg-secondary-foreground/10 rounded-full flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 text-secondary-foreground" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full text-[10px] font-bold text-primary-foreground flex items-center justify-center">{cartCount}</span>
            )}
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 py-4 flex gap-2 overflow-x-auto">
        {([['all', 'Tous'], ['required', 'Obligatoire'], ['optional', 'Optionnel']] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
              filter === key ? 'bg-primary text-primary-foreground' : 'bg-card text-foreground border border-border'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Products grid */}
      <div className="px-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filtered.map(p => {
          const q = getQuality(p.id);
          const price = q === 'premium' ? p.premiumPrice : p.standardPrice;
          return (
            <div key={p.id} className="sb-card overflow-hidden">
              <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${p.required ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground'}`}>
                  {p.required ? 'Obligatoire' : 'Optionnel'}
                </span>
                {p.stock < 5 && (
                  <span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-destructive text-destructive-foreground">
                    Stock faible
                  </span>
                )}
              </div>
              <div className="p-3">
                <h3 className="font-bold text-foreground text-sm leading-tight">{p.name}</h3>
                
                {/* Quality toggle */}
                <div className="flex mt-2 bg-muted rounded-lg p-0.5">
                  {(['standard', 'premium'] as const).map(qual => (
                    <button
                      key={qual}
                      onClick={() => setQuality(p.id, qual)}
                      className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
                        q === qual ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'
                      }`}
                    >
                      {qual === 'standard' ? 'Standard' : 'Premium'}
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-3">
                  <p className="text-lg font-bold text-primary">{price.toLocaleString()} <span className="text-xs">FCFA</span></p>
                  <div className="flex items-center gap-2 bg-muted rounded-lg px-1">
                    <button onClick={() => setQty(p.id, getQty(p.id) - 1)} className="w-7 h-7 flex items-center justify-center text-foreground">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm font-bold w-5 text-center">{getQty(p.id)}</span>
                    <button onClick={() => setQty(p.id, getQty(p.id) + 1)} className="w-7 h-7 flex items-center justify-center text-foreground">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <Button size="sm" className="w-full mt-3" onClick={() => handleAdd(p)}>
                  <Package className="w-4 h-4" /> Ajouter à ma box
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CatalogScreen;

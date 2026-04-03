import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, Package, Plus, Minus, ShoppingBag, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

type Filter = 'all' | 'required' | 'optional';

const CatalogScreen = () => {
  const navigate = useNavigate();
  const { selectedSchool, selectedClass, addToCart, cart } = useStore();
  const [filter, setFilter] = useState<Filter>('all');
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [qualities, setQualities] = useState<Record<string, 'standard' | 'premium'>>({});
  const [dbProducts, setDbProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase.from('products').select('*');
        if (error) throw error;
        setDbProducts(data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Erreur lors du chargement des fournitures');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Map DB products to the format the store expects
  const products = dbProducts.map(p => ({
    id: p.id,
    name: p.name,
    image: p.image_url,
    standardPrice: p.standard_price,
    premiumPrice: p.premium_price,
    category: p.category,
    required: p.required,
    stock: p.stock,
    applicableClasses: [] as string[],
  }));

  const filtered = products.filter(p => {
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-10 h-10 border-3 border-accent/30 border-t-accent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sb-gradient-hero px-4 pt-6 pb-6 rounded-b-[28px] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-accent/5 blur-2xl" />
        <div className="relative z-10 flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="w-9 h-9 sb-card-glass rounded-full flex items-center justify-center border border-white/15">
              <ArrowLeft className="w-4 h-4 text-secondary-foreground" />
            </button>
            <div>
              <h1 className="text-lg font-extrabold text-secondary-foreground">Fournitures</h1>
              <p className="text-xs text-secondary-foreground/50">{selectedSchool || 'Toutes les écoles'} — {selectedClass || 'Toutes les classes'}</p>
            </div>
          </div>
          <button onClick={() => navigate('/app/box')} className="relative w-10 h-10 sb-card-glass rounded-full flex items-center justify-center border border-white/15">
            <ShoppingBag className="w-5 h-5 text-secondary-foreground" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 sb-gradient-primary rounded-full text-[10px] font-bold text-primary-foreground flex items-center justify-center animate-bounce">{cartCount}</span>
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
            className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-300 ${
              filter === key 
                ? 'bg-primary text-primary-foreground sb-glow-primary' 
                : 'bg-card text-foreground border border-border/50 hover:border-accent/30'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Products grid */}
      <div className="px-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map(p => {
          const q = getQuality(p.id);
          const price = q === 'premium' ? p.premiumPrice : p.standardPrice;
          return (
            <div key={p.id} className="sb-card-hover overflow-hidden group">
              <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <span className={`absolute top-2.5 left-2.5 text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm ${p.required ? 'bg-primary/90 text-primary-foreground' : 'bg-accent/90 text-accent-foreground'}`}>
                  {p.required ? 'Obligatoire' : 'Optionnel'}
                </span>
                {p.stock < 5 && (
                  <span className="absolute top-2.5 right-2.5 text-[10px] font-bold px-2.5 py-1 rounded-full bg-destructive/90 text-destructive-foreground backdrop-blur-sm">
                    Stock faible
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-foreground text-sm leading-tight">{p.name}</h3>
                
                {/* Quality toggle */}
                <div className="flex mt-3 bg-muted rounded-xl p-1">
                  {(['standard', 'premium'] as const).map(qual => (
                    <button
                      key={qual}
                      onClick={() => setQuality(p.id, qual)}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all duration-300 ${
                        q === qual 
                          ? qual === 'premium' 
                            ? 'sb-gradient-accent text-accent-foreground shadow-md' 
                            : 'bg-card text-foreground shadow-md' 
                          : 'text-muted-foreground'
                      }`}
                    >
                      {qual === 'standard' ? 'Standard' : '✨ Premium'}
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-3">
                  <p className="text-lg font-extrabold text-primary">{price.toLocaleString()} <span className="text-xs font-semibold">FCFA</span></p>
                  <div className="flex items-center gap-1 bg-muted rounded-xl px-1">
                    <button onClick={() => setQty(p.id, getQty(p.id) - 1)} className="w-8 h-8 flex items-center justify-center text-foreground rounded-lg hover:bg-card transition-colors">
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-sm font-bold w-6 text-center">{getQty(p.id)}</span>
                    <button onClick={() => setQty(p.id, getQty(p.id) + 1)} className="w-8 h-8 flex items-center justify-center text-foreground rounded-lg hover:bg-card transition-colors">
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <Button size="sm" className="w-full mt-3 h-10 font-bold gap-1.5 sb-glow-primary" onClick={() => handleAdd(p)}>
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

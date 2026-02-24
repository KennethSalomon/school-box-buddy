import { useState } from 'react';
import Navbar from '@/components/sunset/Navbar';
import Footer from '@/components/sunset/Footer';
import AnimatedSection from '@/components/sunset/AnimatedSection';
import { menuItems } from '@/data/sunsetData';
import { Minus, Plus, ShoppingBag, Trash2, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const SunsetOrder = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [step, setStep] = useState<'menu' | 'checkout' | 'success'>('menu');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const { toast } = useToast();

  const addItem = (item: typeof menuItems[0]) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id);
      if (existing) return prev.map(c => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c);
      return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1 }];
    });
    toast({ title: `${item.name} ajouté !`, duration: 1500 });
  };

  const updateQty = (id: string, delta: number) => {
    setCart(prev => prev.map(c => c.id === id ? { ...c, quantity: Math.max(0, c.quantity + delta) } : c).filter(c => c.quantity > 0));
  };

  const total = cart.reduce((s, c) => s + c.price * c.quantity, 0);

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-24 flex items-center justify-center min-h-screen">
          <AnimatedSection className="text-center max-w-md px-6">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h1 className="font-serif text-3xl font-bold text-foreground mb-3">Commande confirmée !</h1>
            <p className="text-muted-foreground mb-2">Votre commande #{Math.floor(10000 + Math.random() * 90000)} est en préparation.</p>
            <p className="text-muted-foreground text-sm mb-8">Livraison estimée sous 45-60 minutes.</p>
            <button onClick={() => { setCart([]); setStep('menu'); }} className="bg-primary text-primary-foreground px-8 py-3 rounded-md text-sm font-bold uppercase tracking-[0.1em] hover:opacity-90 transition-opacity">
              Nouvelle commande
            </button>
          </AnimatedSection>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-12">
            <p className="text-primary text-xs uppercase tracking-[0.3em] font-semibold mb-4">Livraison</p>
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground">Commander</h1>
          </AnimatedSection>

          {step === 'menu' && (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="grid sm:grid-cols-2 gap-4">
                  {menuItems.map(item => (
                    <div key={item.id} className="bg-card rounded-lg p-4 border border-border flex items-center gap-4 hover:shadow-md transition-shadow">
                      <div className="w-14 h-14 rounded-lg bg-muted flex items-center justify-center text-2xl flex-shrink-0">
                        {item.category === 'food' ? '🍽️' : item.category === 'dessert' ? '🍰' : '🍹'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground text-sm truncate">{item.name}</h4>
                        <p className="text-primary font-bold text-sm">{item.price.toLocaleString()} F</p>
                      </div>
                      <button onClick={() => addItem(item)} className="w-9 h-9 rounded-md bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 flex-shrink-0 transition-opacity">
                        <Plus size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-card rounded-lg border border-border p-6 sticky top-28">
                  <h3 className="font-serif text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <ShoppingBag size={20} /> Votre commande
                  </h3>
                  {cart.length === 0 ? (
                    <p className="text-muted-foreground text-sm py-8 text-center">Votre panier est vide</p>
                  ) : (
                    <>
                      <div className="space-y-3 mb-6">
                        {cart.map(item => (
                          <div key={item.id} className="flex items-center justify-between gap-2">
                            <span className="text-sm text-foreground flex-1 truncate">{item.name}</span>
                            <div className="flex items-center gap-1.5">
                              <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 rounded border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                                {item.quantity === 1 ? <Trash2 size={12} /> : <Minus size={12} />}
                              </button>
                              <span className="text-sm font-semibold w-5 text-center">{item.quantity}</span>
                              <button onClick={() => updateQty(item.id, 1)} className="w-7 h-7 rounded border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                                <Plus size={12} />
                              </button>
                            </div>
                            <span className="text-sm font-bold text-foreground w-20 text-right">{(item.price * item.quantity).toLocaleString()} F</span>
                          </div>
                        ))}
                      </div>
                      <div className="border-t border-border pt-4 mb-6">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Sous-total</span>
                          <span className="font-semibold">{total.toLocaleString()} F</span>
                        </div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Livraison</span>
                          <span className="font-semibold">1 000 F</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold mt-3">
                          <span>Total</span>
                          <span className="text-primary">{(total + 1000).toLocaleString()} FCFA</span>
                        </div>
                      </div>
                      <button onClick={() => setStep('checkout')} className="w-full bg-primary text-primary-foreground py-3 rounded-md text-sm font-bold uppercase tracking-[0.1em] hover:opacity-90 transition-opacity">
                        Valider — {(total + 1000).toLocaleString()} FCFA
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {step === 'checkout' && (
            <AnimatedSection className="max-w-lg mx-auto">
              <div className="bg-card rounded-lg border border-border p-8">
                <h3 className="font-serif text-2xl font-bold text-foreground mb-6">Informations de livraison</h3>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Nom complet</label>
                    <input value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-3 rounded-md border border-border bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none text-sm transition-colors" placeholder="Votre nom" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Téléphone</label>
                    <input value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-4 py-3 rounded-md border border-border bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none text-sm transition-colors" placeholder="+229 97 00 00 00" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Adresse de livraison</label>
                    <input value={address} onChange={e => setAddress(e.target.value)} className="w-full px-4 py-3 rounded-md border border-border bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none text-sm transition-colors" placeholder="Quartier, rue, repère" />
                  </div>
                </div>
                <div className="border-t border-border pt-4 mb-6">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-primary">{(total + 1000).toLocaleString()} FCFA</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep('menu')} className="flex-1 border-2 border-foreground text-foreground py-3 rounded-md text-sm font-bold uppercase tracking-[0.1em] hover:opacity-80 transition-opacity">
                    Retour
                  </button>
                  <button onClick={() => setStep('success')} className="flex-1 bg-primary text-primary-foreground py-3 rounded-md text-sm font-bold uppercase tracking-[0.1em] hover:opacity-90 transition-opacity">
                    Confirmer
                  </button>
                </div>
              </div>
            </AnimatedSection>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SunsetOrder;

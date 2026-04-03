import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { ArrowLeft, Package, X, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UserLayout from '@/layouts/UserLayout';

const MyBoxScreen = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateCartQuantity } = useStore();

  const subtotal = cart.reduce((s, c) => {
    const price = c.quality === 'premium' ? c.product.premiumPrice : c.product.standardPrice;
    return s + price * c.quantity;
  }, 0);
  const deliveryFee = cart.length > 0 ? 500 : 0;
  const total = subtotal + deliveryFee;
  const totalItems = cart.reduce((s, c) => s + c.quantity, 0);

  return (
    <UserLayout>
      <div className="px-4 pt-6">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)}><ArrowLeft className="w-5 h-5 text-foreground" /></button>
          <h1 className="text-xl font-bold text-foreground">Ma Box 📦</h1>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 bg-muted rounded-3xl flex items-center justify-center mb-5 sb-animate-float">
              <Package className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Ta box est vide</h3>
            <p className="text-sm text-muted-foreground mb-6">Commence ta sélection !</p>
            <Button onClick={() => navigate('/app/search')}>Trouver mes fournitures</Button>
          </div>
        ) : (
          <>
            {/* Progress */}
            <div className="sb-card p-4 mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground font-medium">Articles dans ta box</span>
                <span className="font-bold text-foreground">{totalItems} articles</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-accent rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (totalItems / 12) * 100)}%` }} />
              </div>
            </div>

            {/* Items */}
            <div className="space-y-3">
              {cart.map(item => {
                const price = item.quality === 'premium' ? item.product.premiumPrice : item.product.standardPrice;
                return (
                  <div key={item.product.id} className="sb-card p-3 flex gap-3">
                    <img src={item.product.image} alt={item.product.name} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h4 className="text-sm font-bold text-foreground leading-tight pr-2">{item.product.name}</h4>
                        <button onClick={() => removeFromCart(item.product.id)} className="text-muted-foreground hover:text-destructive flex-shrink-0">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mt-1 ${item.quality === 'premium' ? 'bg-accent/10 text-accent' : 'bg-muted text-muted-foreground'}`}>
                        {item.quality === 'premium' ? 'Premium' : 'Standard'}
                      </span>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2 bg-muted rounded-lg px-1">
                          <button onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)} className="w-6 h-6 flex items-center justify-center">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)} className="w-6 h-6 flex items-center justify-center">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="font-bold text-primary text-sm">{(price * item.quantity).toLocaleString()} FCFA</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary */}
            <div className="sb-card p-4 mt-5 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Sous-total</span>
                <span className="font-semibold">{subtotal.toLocaleString()} FCFA</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Frais de livraison</span>
                <span className="font-semibold">{deliveryFee.toLocaleString()} FCFA</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between">
                <span className="font-bold text-foreground">Total</span>
                <span className="font-bold text-primary text-lg">{total.toLocaleString()} FCFA</span>
              </div>
            </div>

            <Button size="lg" className="w-full mt-5" onClick={() => navigate('/app/checkout')}>
              Valider ma box 📦
            </Button>
          </>
        )}
      </div>
    </UserLayout>
  );
};

export default MyBoxScreen;

import { Link } from 'react-router-dom';
import { Minus, Plus, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCloverStore } from '@/store/useCloverStore';
import { useToast } from '@/hooks/use-toast';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, placeOrder } = useCloverStore();
  const { toast } = useToast();

  const handleCheckout = () => {
    placeOrder();
    toast({ title: 'Commande confirmée ! 🎉' });
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-16 flex flex-col items-center justify-center px-4 text-center">
        <ShoppingBag size={64} className="text-muted-foreground/30 mb-6" />
        <h1 className="text-2xl font-display font-bold mb-2">Votre panier est vide</h1>
        <p className="text-muted-foreground mb-8">Commencez à explorer nos collections.</p>
        <Link
          to="/homme"
          className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-3 rounded-lg font-display font-bold text-sm hover:opacity-90 transition-opacity"
        >
          Explorer <ArrowRight size={14} />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-32 px-4">
      <div className="container max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-8">Panier</h1>

        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={`${item.product.id}-${item.size}`}
              className="flex gap-4 bg-secondary rounded-lg p-4"
            >
              <img
                src={item.product.images[0]}
                alt={item.product.name}
                className="w-24 h-28 object-cover rounded-lg flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-sm truncate">{item.product.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">Taille: {item.size}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id, item.size)}
                    className="text-muted-foreground hover:text-foreground transition-colors p-1"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="flex items-end justify-between mt-4">
                  <div className="flex items-center gap-3 bg-background rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <p className="font-display font-bold text-sm">
                    {item.product.price * item.quantity} €
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-8 bg-secondary rounded-lg p-6 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Sous-total</span>
            <span className="font-medium">{cartTotal()} €</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Livraison</span>
            <span className="font-medium text-primary">Gratuite</span>
          </div>
          <div className="border-t border-border pt-3 flex justify-between">
            <span className="font-display font-bold">Total</span>
            <span className="font-display font-bold text-lg">{cartTotal()} €</span>
          </div>
        </div>

        <button
          onClick={handleCheckout}
          className="w-full mt-6 bg-foreground text-background py-4 rounded-lg font-display font-bold text-sm tracking-wide flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
        >
          Confirmer la commande <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default CartPage;

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Check } from 'lucide-react';
import { products } from '@/data/cloverData';
import { useCloverStore } from '@/store/useCloverStore';
import { useToast } from '@/hooks/use-toast';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const addToCart = useCloverStore((s) => s.addToCart);

  const product = products.find((p) => p.id === id);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Produit introuvable.</p>
      </div>
    );
  }

  const handleAdd = () => {
    if (!selectedSize) {
      toast({ title: 'Sélectionnez une taille', variant: 'destructive' });
      return;
    }
    addToCart(product, selectedSize);
    setAdded(true);
    toast({ title: `${product.name} ajouté au panier` });
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen pt-16 pb-24">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-20 left-4 z-30 w-10 h-10 bg-background/90 backdrop-blur rounded-full flex items-center justify-center shadow-md hover:bg-background transition-colors"
      >
        <ArrowLeft size={18} />
      </button>

      <div className="md:grid md:grid-cols-2 md:gap-0">
        {/* Image */}
        <div className="aspect-[3/4] md:aspect-auto md:h-[calc(100vh-4rem)] md:sticky md:top-16 overflow-hidden bg-muted">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="p-6 md:p-12 md:flex md:flex-col md:justify-center max-w-lg mx-auto md:mx-0">
          {product.badge && (
            <span className="inline-block bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded mb-4 w-fit">
              {product.badge}
            </span>
          )}

          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
            {product.name}
          </h1>

          <p className="text-2xl font-display font-bold text-primary mb-6">
            {product.price} €
          </p>

          <p className="text-muted-foreground leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Size selector */}
          <div className="mb-8">
            <p className="text-sm font-semibold mb-3">Taille</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 rounded-lg text-sm font-bold transition-all ${
                    selectedSize === size
                      ? 'bg-foreground text-background ring-2 ring-primary'
                      : 'bg-secondary text-foreground hover:bg-foreground/10'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAdd}
            className={`w-full py-4 rounded-lg font-display font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all ${
              added
                ? 'bg-primary text-primary-foreground'
                : 'bg-foreground text-background hover:opacity-90'
            }`}
          >
            {added ? (
              <>
                <Check size={18} /> Ajouté !
              </>
            ) : (
              <>
                <ShoppingBag size={18} /> Ajouter au panier
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

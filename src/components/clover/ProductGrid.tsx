import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Product, productTypes } from '@/data/cloverData';
import ProductCard from './ProductCard';

interface Props {
  products: Product[];
  title: string;
}

const ProductGrid = ({ products, title }: Props) => {
  const [search, setSearch] = useState('');
  const [activeType, setActiveType] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.type.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      const matchesType = !activeType || p.type === activeType;
      return matchesSearch && matchesType;
    });
  }, [products, search, activeType]);

  return (
    <div>
      {/* Parallax text background */}
      <div className="relative overflow-hidden py-8 md:py-12">
        <div className="parallax-text-dark absolute inset-0 flex items-center justify-center text-[8rem] md:text-[14rem] font-display leading-none whitespace-nowrap opacity-40">
          {title.toUpperCase()}
        </div>
        <h1 className="relative text-4xl md:text-6xl font-display font-bold text-center">
          {title}
        </h1>
      </div>

      {/* Search + Filters */}
      <div className="container space-y-4 mb-8">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-secondary rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>

        <div className="flex items-center justify-center gap-2 flex-wrap">
          <button
            onClick={() => setActiveType(null)}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              !activeType
                ? 'bg-foreground text-background'
                : 'bg-secondary text-foreground hover:bg-foreground/10'
            }`}
          >
            Tout
          </button>
          {productTypes.map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(activeType === type ? null : type)}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all ${
                activeType === type
                  ? 'bg-foreground text-background'
                  : 'bg-secondary text-foreground hover:bg-foreground/10'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 pb-24">
        {filtered.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-20 text-muted-foreground">
            Aucun produit trouvé.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;

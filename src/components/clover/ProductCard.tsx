import { Link } from 'react-router-dom';
import { Product } from '@/data/cloverData';

interface Props {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: Props) => {
  return (
    <Link
      to={`/produit/${product.id}`}
      className="product-card-hover group block"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted">
        <img
          src={product.images[0]}
          alt={product.name}
          className="img-zoom w-full h-full object-cover"
          loading="lazy"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded">
            {product.badge}
          </span>
        )}
      </div>
      <div className="mt-3 space-y-1">
        <h3 className="text-sm font-medium truncate">{product.name}</h3>
        <p className="text-sm font-display font-bold">{product.price} €</p>
      </div>
    </Link>
  );
};

export default ProductCard;

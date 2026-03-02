import { products } from '@/data/cloverData';
import ProductGrid from '@/components/clover/ProductGrid';

const WomenPage = () => {
  const womenProducts = products.filter((p) => p.category === 'women');
  return <ProductGrid products={womenProducts} title="Femme" />;
};

export default WomenPage;

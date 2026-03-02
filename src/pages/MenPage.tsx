import { products } from '@/data/cloverData';
import ProductGrid from '@/components/clover/ProductGrid';

const MenPage = () => {
  const menProducts = products.filter((p) => p.category === 'men');
  return <ProductGrid products={menProducts} title="Homme" />;
};

export default MenPage;

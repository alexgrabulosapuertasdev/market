import { RouteProp, useRoute } from '@react-navigation/native';
import { useProduct } from '../../hooks/useProduct';
import ProductCard from '../../components/products/ProductCard';

export default function Product() {
  const route = useRoute<RouteProp<{ params: { id: string } }>>();
  const { id } = route.params;
  const { product } = useProduct(id);

  return <>{product && <ProductCard product={product} />}</>;
}

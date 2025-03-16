import { useProduct } from '../../hooks/useProduct';
import ProductCard from '../../components/products/ProductCard';
import { useParams } from 'react-router-dom';

export default function Product() {
  const { id } = useParams();
  const { product } = useProduct(id);

  return <>{product && <ProductCard product={product} />}</>;
}

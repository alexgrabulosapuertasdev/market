import { useEffect, useState } from 'react';
import { ProductResponse } from '../models/interfaces/Product';
import { findOneById } from '../services/product.service';

export function useProduct(id: string) {
  const [product, setProduct] = useState<ProductResponse>(undefined);

  useEffect(() => {
    findOneById(id).then((data) => setProduct(data));
  }, [id]);

  return {
    product,
  };
}

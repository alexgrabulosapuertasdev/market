import { useEffect, useState } from 'react';
import { ProductResponse } from '../models/interfaces/Product';
import { findAll } from '../services/product.service';

export function useProducts() {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [filter, setFilter] = useState<string>(undefined);

  useEffect(() => {
    findAll(filter).then((products) => setProducts(products));
  }, [filter]);

  return {
    products,
    setFilter,
  };
}

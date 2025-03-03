import { useEffect, useState } from 'react';
import { ProductResponse } from '../models/interfaces/Product';
import { findAll } from '../services/product.service';

export function useProducts() {
  const [products, setProducts] = useState<ProductResponse[]>([]);

  useEffect(() => {
    findAll().then((products) => setProducts(products));
  }, []);

  return {
    products,
  };
}

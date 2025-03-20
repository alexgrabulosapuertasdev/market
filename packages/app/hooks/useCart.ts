import { useState } from 'react';
import { ProductCart, ProductResponse } from '../models/interfaces/Product';

export function useCart() {
  const [productsCart, setProductsCart] = useState<ProductCart[]>([]);
  const [showCart, setShowCart] = useState<boolean>(false);

  const addProduct = (product: ProductResponse) => {
    setProductsCart((prevProducts) => {
      const index = prevProducts.findIndex((item) => item.id === product.id);

      if (index === -1) {
        return [...prevProducts, { ...product, quantity: 1 }];
      } else {
        return prevProducts.map((item, i) =>
          i === index ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
    });
  };

  const decreaseProduct = (productId: string) => {
    setProductsCart((prevProducts) => {
      return prevProducts.reduce((acc, product) => {
        if (productId !== product.id) {
          acc.push(product);
          return acc;
        }
        if (product.quantity <= 1) {
          return acc;
        }
        acc.push({ ...product, quantity: product.quantity - 1 });

        return acc;
      }, []);
    });
  };

  const deleteProduct = (productId: string) => {
    setProductsCart((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId),
    );
  };

  return {
    productsCart,
    addProduct,
    decreaseProduct,
    deleteProduct,
    showCart,
    setShowCart,
  };
}

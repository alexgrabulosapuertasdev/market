import { createContext, useContext } from 'react';
import { useCart } from '../hooks/useCart';
import { ProductCart, ProductResponse } from '../models/interfaces/Product';

interface CartContextType {
  productsCart: Array<ProductCart>;
  addProduct: (product: ProductResponse) => void;
  decreaseProduct: (productId: string) => void;
  deleteProduct: (productId: string) => void;
  showCart: boolean;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartContext = createContext<CartContextType>(undefined);

export const CartProvider = ({ children }) => {
  const {
    productsCart,
    addProduct,
    deleteProduct,
    decreaseProduct,
    showCart,
    setShowCart,
  } = useCart();

  return (
    <CartContext.Provider
      value={{
        productsCart,
        addProduct,
        deleteProduct,
        decreaseProduct,
        showCart,
        setShowCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};

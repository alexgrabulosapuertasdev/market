import { CartProduct } from '../aggregates/cart-product';
import { CartProductProductIdMother } from './cart-product-product-id.mother';
import { CartProductQuantityMother } from './cart-product-quantity.mother';

interface CartProductParams {
  productId: string;
  quantity: number;
}

export class CartProductMother {
  static create(params?: Partial<CartProductParams>): CartProduct {
    const primitives: CartProductParams = {
      productId: CartProductProductIdMother.create().value,
      quantity: CartProductQuantityMother.create().value,
      ...params,
    };

    return CartProduct.create(primitives);
  }
}

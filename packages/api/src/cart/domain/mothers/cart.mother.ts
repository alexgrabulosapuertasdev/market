import { Cart } from '../aggregates/cart';
import { CartProductMother } from './cart-product.mother';
import { CartUserIdMother } from './cart-user-id.mother';

interface CartParams {
  userId: string;
  products: Array<{
    productId: string;
    quantity: number;
  }>;
}

export class CartMother {
  static create(params?: Partial<CartParams>): Cart {
    const primitives: CartParams = {
      userId: CartUserIdMother.create().value,
      products: [
        CartProductMother.create().toPrimitives(),
        CartProductMother.create().toPrimitives(),
      ],
      ...params,
    };

    return Cart.create(primitives);
  }
}

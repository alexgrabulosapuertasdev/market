import { CartProductProductId } from './cart-product-product-id';
import { CartProductQuantity } from './cart-product-quantity';

interface Primitives {
  productId: string;
  quantity: number;
}

export class CartProduct {
  constructor(
    private productId: CartProductProductId,
    private quantity: CartProductQuantity,
  ) {}

  static create(params: Primitives): CartProduct {
    const { productId, quantity } = params;

    return new CartProduct(
      new CartProductProductId(productId),
      new CartProductQuantity(quantity),
    );
  }

  toPrimitives(): Primitives {
    return {
      productId: this.productId.value,
      quantity: this.quantity.value,
    };
  }
}

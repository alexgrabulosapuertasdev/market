import { CartUserId } from './cart-user-id';
import { CartProduct } from './cart-product';

interface Primitives {
  userId: string;
  products: Array<{
    productId: string;
    quantity: number;
  }>;
}

export class Cart {
  constructor(
    private userId: CartUserId,
    private products: Array<CartProduct>,
  ) {}

  static create(params: Primitives): Cart {
    const { userId, products } = params;

    return new Cart(
      new CartUserId(userId),
      products.map((product) => CartProduct.create(product)),
    );
  }

  toPrimitives(): Primitives {
    return {
      userId: this.userId.value,
      products: this.products.map((product) => product.toPrimitives()),
    };
  }
}

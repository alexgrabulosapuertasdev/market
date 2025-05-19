import { Cart } from '../aggregates/cart';

export abstract class CartRepository {
  abstract save(cart: Cart): Promise<Cart>;
}

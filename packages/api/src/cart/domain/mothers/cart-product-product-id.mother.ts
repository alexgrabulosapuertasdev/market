import { randomUUID } from 'crypto';
import { CartProductProductId } from '../aggregates/cart-product-product-id';

export class CartProductProductIdMother {
  static create(value?: string): CartProductProductId {
    return new CartProductProductId(value ?? randomUUID());
  }
}

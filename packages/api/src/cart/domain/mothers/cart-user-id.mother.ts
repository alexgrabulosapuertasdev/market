import { randomUUID } from 'crypto';
import { CartUserId } from '../aggregates/cart-user-id';

export class CartUserIdMother {
  static create(value?: string): CartUserId {
    return new CartUserId(value ?? randomUUID());
  }
}

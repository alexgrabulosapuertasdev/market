import { faker } from '@faker-js/faker';
import { CartProductQuantity } from '../aggregates/cart-product-quantity';

export class CartProductQuantityMother {
  static create(value?: number): CartProductQuantity {
    return new CartProductQuantity(
      value ?? faker.number.int({ max: 30, min: 1 }),
    );
  }
}

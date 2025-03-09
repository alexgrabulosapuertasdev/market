import { faker } from '@faker-js/faker';
import { SaleProductQuantity } from '../aggregates/sale-product-quantity';

export class SaleProductQuantityMother {
  static create(value?: number): SaleProductQuantity {
    return new SaleProductQuantity(
      value ?? faker.number.int({ max: 50, min: 1 }),
    );
  }
}

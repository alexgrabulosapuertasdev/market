import { faker } from '@faker-js/faker';
import { SaleProductName } from '../aggregates/sale-product-name';

export class SaleProductNameMother {
  static create(value?: string): SaleProductName {
    return new SaleProductName(value ?? faker.commerce.productName());
  }
}

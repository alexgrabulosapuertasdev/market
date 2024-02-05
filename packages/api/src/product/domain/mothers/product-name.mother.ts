import { faker } from '@faker-js/faker';
import { ProductName } from '../aggregates/product-name';

export class ProductNameMother {
  static create(value?: string): ProductName {
    return new ProductName(value ?? faker.commerce.productName());
  }
}

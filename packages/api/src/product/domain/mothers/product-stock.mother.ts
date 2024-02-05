import { faker } from '@faker-js/faker';
import { ProductStock } from '../aggregates/product-stock';

export class ProductStockMother {
  static create(value?: number): ProductStock {
    return new ProductStock(value ?? faker.number.int({ max: 1000 }));
  }
}

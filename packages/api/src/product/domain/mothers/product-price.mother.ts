import { faker } from '@faker-js/faker';
import { ProductPrice } from '../aggregates/product-price';

export class ProductPriceMother {
  static create(value?: number): ProductPrice {
    return new ProductPrice(value ?? Number(faker.commerce.price()));
  }
}

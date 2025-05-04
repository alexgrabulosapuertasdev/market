import { faker } from '@faker-js/faker';
import { SaleProductPrice } from '../aggregates/sale-product-price';

export class SaleProductPriceMother {
  static create(value?: number): SaleProductPrice {
    return new SaleProductPrice(value ?? Number(faker.commerce.price()));
  }
}

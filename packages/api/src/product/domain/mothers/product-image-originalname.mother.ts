import { faker } from '@faker-js/faker';
import { ProductImageOriginalname } from '../aggregates/product-image-originalname';

export class ProductImageOriginalnameMother {
  static create(value?: string): ProductImageOriginalname {
    return new ProductImageOriginalname(
      value ?? `${faker.commerce.productName()}.jpg`,
    );
  }
}

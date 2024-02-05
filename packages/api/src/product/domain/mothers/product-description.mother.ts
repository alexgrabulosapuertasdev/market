import { faker } from '@faker-js/faker';
import { ProductDescription } from '../aggregates/product-description';

export class ProductDescriptionMother {
  static create(value?: string): ProductDescription {
    return new ProductDescription(value ?? faker.commerce.productDescription());
  }
}

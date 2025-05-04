import { faker } from '@faker-js/faker';
import { SaleProductDescription } from '../aggregates/sale-product-description';

export class SaleProductDescriptionMother {
  static create(value?: string): SaleProductDescription {
    return new SaleProductDescription(
      value ?? faker.commerce.productDescription(),
    );
  }
}

import { randomUUID } from 'crypto';
import { ProductId } from '../aggregates/product-id';

export class ProductIdMother {
  static create(value?: string): ProductId {
    return new ProductId(value ?? randomUUID());
  }
}

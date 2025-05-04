import { randomUUID } from 'crypto';
import { SaleProductProductId } from '../aggregates/sale-product-product-id';

export class SaleProductProductIdMother {
  static create(value?: string): SaleProductProductId {
    return new SaleProductProductId(value ?? randomUUID());
  }
}

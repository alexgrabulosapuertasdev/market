import { randomUUID } from 'crypto';
import { SaleProductId } from '../aggregates/sale-product-id';

export class SaleProductIdMother {
  static create(value?: string): SaleProductId {
    return new SaleProductId(value ?? randomUUID());
  }
}

import { randomUUID } from 'crypto';
import { SaleId } from '../aggregates/sale-id';

export class SaleIdMother {
  static create(value?: string): SaleId {
    return new SaleId(value ?? randomUUID());
  }
}

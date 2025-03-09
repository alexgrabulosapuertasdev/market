import { randomUUID } from 'crypto';
import { SaleUserId } from '../aggregates/sale-user-id';

export class SaleUserIdMother {
  static create(value?: string): SaleUserId {
    return new SaleUserId(value ?? randomUUID());
  }
}

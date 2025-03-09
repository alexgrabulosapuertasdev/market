import { faker } from '@faker-js/faker';
import { SaleDate } from '../aggregates/sale-date';

export class SaleDateMother {
  static create(value?: Date): SaleDate {
    return new SaleDate(value ?? faker.date.anytime());
  }
}

import { Sale } from '../aggregates/sale';

export abstract class SaleRepository {
  abstract save(sale: Sale): Promise<Sale>;
}

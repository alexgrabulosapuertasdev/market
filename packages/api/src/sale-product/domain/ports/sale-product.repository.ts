import { SaleProduct } from '../aggregates/sale-product';

export abstract class SaleProductRepository {
  abstract findAllByIds(ids: string[]): Promise<SaleProduct[]>;
  abstract saveMany(salesProducts: SaleProduct[]): Promise<SaleProduct[]>;
}

import { Product } from '../aggregates/product';

export abstract class ProductRepository {
  abstract findAll(filter?: string): Promise<Product[]>;
  abstract findAllByIds(ids: string[]): Promise<Product[]>;
  abstract findOneById(id: string): Promise<Product>;
  abstract save(product: Product): Promise<Product>;
}

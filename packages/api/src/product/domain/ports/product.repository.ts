import { Product } from '../aggregates/product';

export abstract class ProductRepository {
  abstract findAll(): Promise<Product[]>;
  abstract save(product: Product): Promise<Product>;
}

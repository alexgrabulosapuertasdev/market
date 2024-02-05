import { Product } from '../aggregates/product';

export abstract class ProductRepository {
  abstract save(product: Product): Promise<Product>;
}

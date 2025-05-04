import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../domain/ports/product.repository';
import { Product } from '../../domain/aggregates/product';

@Injectable()
export class ProductFindAll {
  constructor(private readonly productRepository: ProductRepository) {}

  async run(filter?: string): Promise<Product[]> {
    const products = await this.productRepository.findAll(filter);

    return products;
  }
}

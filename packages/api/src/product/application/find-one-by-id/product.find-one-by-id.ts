import { Injectable } from '@nestjs/common';
import { Product } from '../../domain/aggregates/product';
import { ProductRepository } from '../../domain/ports/product.repository';

@Injectable()
export class ProductFindOneById {
  constructor(private readonly productRepository: ProductRepository) {}

  async run(id: string): Promise<Product> {
    const product = await this.productRepository.findOneById(id);

    return product;
  }
}

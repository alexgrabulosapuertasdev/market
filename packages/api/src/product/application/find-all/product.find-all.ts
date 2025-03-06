import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../domain/ports/product.repository';
import { ProductResponse } from '../../domain/interface/product.response';

@Injectable()
export class ProductFindAll {
  constructor(private readonly productRepository: ProductRepository) {}

  async run(filter?: string): Promise<ProductResponse[]> {
    const products = await this.productRepository.findAll(filter);

    return products.map((product) => product.toPrimitives());
  }
}

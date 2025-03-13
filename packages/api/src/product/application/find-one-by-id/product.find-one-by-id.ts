import { Injectable } from '@nestjs/common';
import { ProductResponse } from '../../domain/interface/product.response';
import { ProductRepository } from '../../domain/ports/product.repository';

@Injectable()
export class ProductFindOneById {
  constructor(private readonly productRepository: ProductRepository) {}

  async run(id: string): Promise<ProductResponse> {
    const product = await this.productRepository.findOneById(id);

    return product.toPrimitives();
  }
}

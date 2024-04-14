import { Injectable } from '@nestjs/common';
import { ProductCreateRequest } from './product.create.request';
import { Product } from '../../domain/aggregates/product';
import { ProductResponse } from '../../domain/interface/product.response';
import { ProductRepository } from '../../domain/ports/product.repository';

@Injectable()
export class ProductCreate {
  constructor(private readonly productRepository: ProductRepository) {}

  async run(
    productCreateRequest: ProductCreateRequest,
  ): Promise<ProductResponse> {
    const product = Product.create(productCreateRequest);

    const productResponse = await this.productRepository.save(product);

    return productResponse.toPrimitives();
  }
}

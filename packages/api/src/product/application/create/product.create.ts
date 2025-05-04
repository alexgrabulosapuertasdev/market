import { Injectable } from '@nestjs/common';
import { ProductCreateRequest } from './product.create.request';
import { Product } from '../../domain/aggregates/product';
import { ProductRepository } from '../../domain/ports/product.repository';

@Injectable()
export class ProductCreate {
  constructor(private readonly productRepository: ProductRepository) {}

  async run(productCreateRequest: ProductCreateRequest): Promise<Product> {
    const product = Product.create(productCreateRequest);

    const productCreated = await this.productRepository.save(product);

    return productCreated;
  }
}

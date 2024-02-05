import { Injectable } from '@nestjs/common';
import { ProductCreateRequest } from './product.create.request';
import { Product } from '../../domain/aggregates/product';
import { ProductResponse } from '../../domain/interface/product.response';
import { ProductRepository } from '../../domain/ports/product.repository';
import { getImageBase64 } from '../../domain/services/get-image-base64';

@Injectable()
export class ProductCreate {
  constructor(private readonly productRepository: ProductRepository) {}

  async run(
    productCreateRequest: ProductCreateRequest,
  ): Promise<ProductResponse> {
    const product = Product.create(productCreateRequest);

    const productResponse = await this.productRepository.save(product);
    const imageBase64 = getImageBase64(productCreateRequest.imageOriginalname);

    return { ...productResponse.toPrimitives(), imageBase64 };
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductTypeorm } from './entity/product-typeorm.entity';
import { Product } from '../../domain/aggregates/product';
import { ProductRepository } from '../../domain/ports/product.repository';

@Injectable()
export class ProductTypeormRepository implements ProductRepository {
  constructor(
    @InjectRepository(ProductTypeorm)
    private readonly productRepository: Repository<ProductTypeorm>,
  ) {}

  async save(product: Product): Promise<Product> {
    const productResponse = await this.productRepository.save(
      product.toPrimitives(),
    );

    return Product.create(productResponse);
  }
}

import { Injectable } from '@nestjs/common';
import { SaleCreateRequest } from './sale.create.request';
import { Sale } from '../../domain/aggregates/sale';
import { SaleRepository } from '../../domain/ports/sale.repository';
import { ProductRepository } from '../../../product/domain/ports/product.repository';

@Injectable()
export class SaleCreate {
  constructor(
    private readonly saleRepository: SaleRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async run(saleCreateRequest: SaleCreateRequest): Promise<Sale> {
    const { id, date, userId, products } = saleCreateRequest;

    const productsResponse = await this.productRepository.findAllByIds(
      products.map((product) => product.productId),
    );

    const productsMap = productsResponse.reduce((map, product) => {
      const primitives = product.toPrimitives();

      map.set(primitives.id, primitives);

      return map;
    }, new Map());

    const saleProducts = products.map(({ productId, quantity }) => ({
      ...productsMap.get(productId),
      quantity,
      productId,
    }));

    const sale = Sale.create({
      id,
      date,
      userId,
      products: saleProducts,
    });

    const saleResponse = await this.saleRepository.save(sale);

    return saleResponse;
  }
}

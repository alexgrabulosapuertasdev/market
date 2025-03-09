import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { SaleCreateRequest } from './sale.create.request';
import { Sale } from '../../domain/aggregates/sale';
import { SaleResponse } from '../../domain/interfaces/sale-response';
import { SaleRepository } from '../../domain/ports/sale.repository';
import { ProductRepository } from '../../../product/domain/ports/product.repository';
import { SaleProduct } from '../../../sale-product/domain/aggregates/sale-product';
import { SaleProductRepository } from '../../../sale-product/domain/ports/sale-product.repository';
import { UserRepository } from '../../../user/domain/ports/user.repository';

@Injectable()
export class SaleCreate {
  constructor(
    private readonly saleRepository: SaleRepository,
    private readonly userRepository: UserRepository,
    private readonly productRepository: ProductRepository,
    private readonly saleProductRepository: SaleProductRepository,
  ) {}

  async run(saleCreateRequest: SaleCreateRequest): Promise<SaleResponse> {
    const { id, date, userId, products } = saleCreateRequest;
    const productsId = products.map(({ productId }) => productId);

    const [user, productsResponse] = await Promise.all([
      this.userRepository.findOneById(userId),
      this.productRepository.findAllByIds(productsId),
    ]);

    const productsMap = productsResponse.reduce((map, product) => {
      const { id, name, price } = product.toPrimitives();
      map.set(id, { name, price });
      return map;
    }, new Map());

    const saleProducts = products.map(({ productId, quantity }) => {
      const { name, price } = productsMap.get(productId);

      const saleProductPrimitive = {
        id: randomUUID(),
        name,
        price,
        quantity,
        productId,
      };

      return SaleProduct.create(saleProductPrimitive);
    });

    const saleProductsResponse = await this.saleProductRepository.saveMany(
      saleProducts,
    );

    const sale = Sale.create({
      id,
      date,
      userId,
      saleProducts: saleProductsResponse.map((sp) => sp.toPrimitives()),
    });

    const saleResponse = (await this.saleRepository.save(sale)).toPrimitives();

    return {
      id: saleResponse.id,
      date: saleResponse.date,
      totalAmount: saleResponse.totalAmount,
      user: {
        id: saleResponse.userId,
        name: user.name.value,
      },
      saleProducts: saleResponse.saleProducts.map((saleProduct) => ({
        id: saleProduct.id,
        name: saleProduct.name,
        price: saleProduct.price,
        quantity: saleProduct.quantity,
        totalAmount: saleProduct.totalAmount,
        productId: saleProduct.productId,
      })),
    };
  }
}

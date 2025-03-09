import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { SaleProductTypeorm } from './entity/sale-product-typeorm.entity';
import { SaleProduct } from '../../domain/aggregates/sale-product';
import { SaleProductRepository } from '../../domain/ports/sale-product.repository';

@Injectable()
export class SaleProductTypeormRepository implements SaleProductRepository {
  constructor(
    @InjectRepository(SaleProductTypeorm)
    private readonly saleProductRepository: Repository<SaleProductTypeorm>,
  ) {}

  async findAllByIds(ids: string[]): Promise<SaleProduct[]> {
    const saleProducts = await this.saleProductRepository.find({
      where: {
        id: In(ids),
      },
    });

    return saleProducts.map((saleProduct) => {
      return SaleProduct.create({
        id: saleProduct.id,
        name: saleProduct.product.name,
        price: saleProduct.price,
        quantity: saleProduct.quantity,
        productId: saleProduct.product.id,
      });
    });
  }

  async saveMany(salesProducts: SaleProduct[]): Promise<SaleProduct[]> {
    const salesProductsEntities = salesProducts.map((saleProduct) => {
      const { id, name, price, totalAmount, quantity, productId } =
        saleProduct.toPrimitives();

      return {
        id,
        name,
        price,
        totalAmount,
        quantity,
        product: { id: productId },
      };
    });

    const salesProductsResponse = await this.saleProductRepository.save(
      salesProductsEntities,
    );

    return salesProductsResponse.map((saleProduct) => {
      return SaleProduct.create({
        id: saleProduct.id,
        name: saleProduct.name,
        price: saleProduct.price,
        quantity: saleProduct.quantity,
        productId: saleProduct.product.id,
      });
    });
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaleTypeorm } from './entity/sale-typeorm.entity';
import { Sale } from '../../domain/aggregates/sale';
import { SaleRepository } from '../../domain/ports/sale.repository';

@Injectable()
export class SaleTypeormRepository implements SaleRepository {
  constructor(
    @InjectRepository(SaleTypeorm)
    private readonly saleRepository: Repository<SaleTypeorm>,
  ) {}

  async save(sale: Sale): Promise<Sale> {
    const primitives = sale.toPrimitives();

    await this.saleRepository.save({
      id: primitives.id,
      date: primitives.date,
      userId: primitives.userId,
      totalAmount: primitives.totalAmount,
      saleProducts: primitives.saleProducts.map((saleProduct) => ({
        id: saleProduct.id,
      })),
    });

    const saleResponse = await this.saleRepository.findOne({
      where: { id: primitives.id },
      relations: ['saleProducts', 'saleProducts.product'],
      select: {
        id: true,
        date: true,
        totalAmount: true,
        userId: true,
        saleProducts: {
          id: true,
          price: true,
          quantity: true,
          product: {
            id: true,
            name: true,
          },
        },
      },
    });

    return Sale.create({
      id: saleResponse.id,
      date: saleResponse.date,
      userId: saleResponse.userId,
      saleProducts: saleResponse.saleProducts.map((saleProduct) => ({
        id: saleProduct.id,
        name: saleProduct.product.name,
        price: saleProduct.price,
        quantity: saleProduct.quantity,
        productId: saleProduct.product.id,
      })),
    });
  }
}

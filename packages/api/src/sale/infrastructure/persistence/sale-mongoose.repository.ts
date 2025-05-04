import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SaleMongoose } from './entity/sale-mongoose.model';
import { Sale } from '../../domain/aggregates/sale';
import { SaleRepository } from '../../domain/ports/sale.repository';

@Injectable()
export class SaleMongooseRepository implements SaleRepository {
  constructor(
    @InjectModel(SaleMongoose.name, 'sale')
    private readonly saleModel: Model<SaleMongoose>,
  ) {}

  async save(sale: Sale): Promise<Sale> {
    const saleSaved = await this.saleModel.create(sale.toPrimitives());

    return Sale.create({
      id: saleSaved.id,
      date: saleSaved.date,
      userId: saleSaved.userId,
      products: saleSaved.products.map((product) => ({
        productId: product.productId,
        name: product.name,
        description: product.description,
        category: product.category,
        price: product.price,
        quantity: product.quantity,
        image: product.image,
      })),
    });
  }
}

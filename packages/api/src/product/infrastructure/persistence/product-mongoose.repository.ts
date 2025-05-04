import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductMongoose } from './entity/product-mongoose.model';
import { Product } from '../../domain/aggregates/product';
import { ProductRepository } from '../../domain/ports/product.repository';

@Injectable()
export class ProductMongooseRepository implements ProductRepository {
  constructor(
    @InjectModel(ProductMongoose.name, 'product')
    private readonly productModel: Model<ProductMongoose>,
  ) {}

  async findAll(filter?: string): Promise<Product[]> {
    const filterRegex = filter ? new RegExp(filter, 'i') : new RegExp('');
    const products = await this.productModel
      .find({
        $or: [
          { name: { $regex: filterRegex } },
          { category: { $regex: filterRegex } },
        ],
      })
      .exec();

    return products.map((product) => Product.create(product));
  }

  async findAllByIds(ids: string[]): Promise<Product[]> {
    const products = await this.productModel.find({ id: { $in: ids } });

    return Promise.all(products.map((product) => Product.create(product)));
  }

  async findOneById(productId: string): Promise<Product> {
    const product = await this.productModel.findOne({
      id: productId,
    });

    return Product.create(product);
  }

  async save(product: Product): Promise<Product> {
    const productSaved = await this.productModel.create(product.toPrimitives());

    return Product.create(productSaved);
  }
}

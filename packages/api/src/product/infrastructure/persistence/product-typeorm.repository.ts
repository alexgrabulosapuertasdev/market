import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ProductTypeorm } from './entity/product-typeorm.entity';
import { Product } from '../../domain/aggregates/product';
import { ProductRepository } from '../../domain/ports/product.repository';
import { InjectModel } from '@nestjs/mongoose';
import { ProductImageMongoose } from './entity/product-image-mongoose.model';
import { Model } from 'mongoose';

@Injectable()
export class ProductTypeormRepository implements ProductRepository {
  constructor(
    @InjectRepository(ProductTypeorm)
    private readonly productRepository: Repository<ProductTypeorm>,
    @InjectModel(ProductImageMongoose.name)
    private readonly productImageModel: Model<ProductImageMongoose>,
  ) {}

  async findAll(filter?: string): Promise<Product[]> {
    const products = await this.productRepository
      .createQueryBuilder('product')
      .where('product.name LIKE :filter OR product.category LIKE :filter', {
        filter: filter ? `%${filter}%` : '%',
      })
      .getMany();

    return Promise.all(
      products.map(async (product) => {
        const productImage = await this.productImageModel.findOne({
          productId: product.id,
        });
        const productResponse = {
          ...product,
          image: productImage,
        };

        return Product.create(productResponse);
      }),
    );
  }

  async findAllByIds(ids: string[]): Promise<Product[]> {
    const products = await this.productRepository.find({
      where: {
        id: In(ids),
      },
    });

    return Promise.all(
      products.map(async (product) => {
        const productImage = await this.productImageModel.findOne({
          productId: product.id,
        });
        const productResponse = {
          ...product,
          image: productImage,
        };

        return Product.create(productResponse);
      }),
    );
  }

  async save(product: Product): Promise<Product> {
    const {
      image: { originalname, mimetype, size, base64 },
      ...productPrimitives
    } = product.toPrimitives();

    const productResponse = await this.productRepository.save(
      productPrimitives,
    );

    const createProductImage = new this.productImageModel({
      productId: productPrimitives.id,
      originalname,
      mimetype,
      size,
      base64,
    });
    const productImageResponse = await createProductImage.save();

    return Product.create({
      ...productResponse,
      image: {
        originalname: productImageResponse.originalname,
        mimetype: productImageResponse.mimetype,
        size: productImageResponse.size,
        base64: productImageResponse.base64,
      },
    });
  }
}

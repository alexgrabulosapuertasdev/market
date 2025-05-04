import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductCreate } from '../application/create/product.create';
import { ProductFindAll } from '../application/find-all/product.find-all';
import { ProductFindOneById } from '../application/find-one-by-id/product.find-one-by-id';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ProductMongoose,
  ProductSchema,
} from './persistence/entity/product-mongoose.model';
import { ProductMongodbConfig } from './persistence/product-mongodb.config';
import { ProductRepository } from '../domain/ports/product.repository';
import { ProductMongooseRepository } from './persistence/product-mongoose.repository';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    ProductMongodbConfig.createConnection(),
    MongooseModule.forFeature(
      [
        {
          name: ProductMongoose.name,
          schema: ProductSchema,
          collection: 'product',
        },
      ],
      'product',
    ),
  ],
  controllers: [ProductController],
  providers: [
    ProductCreate,
    ProductFindAll,
    ProductFindOneById,
    { provide: ProductRepository, useClass: ProductMongooseRepository },
  ],
  exports: [
    { provide: ProductRepository, useClass: ProductMongooseRepository },
  ],
})
export class ProductModule {}

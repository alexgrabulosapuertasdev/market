import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTypeorm } from './persistence/entity/product-typeorm.entity';
import { ProductController } from './product.controller';
import { ProductCreate } from '../application/create/product.create';
import { ProductRepository } from '../domain/ports/product.repository';
import { ProductFindAll } from '../application/find-all/product.find-all';
import { ProductTypeormRepository } from './persistence/product-typeorm.repository';
import {
  ProductImageMongoose,
  ProductImageSchema,
} from './persistence/entity/product-image-mongoose.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductTypeorm]),
    MongooseModule.forFeature([
      {
        name: ProductImageMongoose.name,
        schema: ProductImageSchema,
        collection: 'ProductImage',
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [
    ProductCreate,
    ProductFindAll,
    { provide: ProductRepository, useClass: ProductTypeormRepository },
  ],
})
export class ProductModule {}

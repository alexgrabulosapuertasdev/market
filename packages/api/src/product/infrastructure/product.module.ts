import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { diskStorage } from 'multer';
import { ProductTypeorm } from './persistence/entity/product-typeorm.entity';
import { ProductController } from './product.controller';
import { ProductCreate } from '../application/create/product.create';
import { ProductRepository } from '../domain/ports/product.repository';
import { ProductTypeormRepository } from './persistence/product-typeorm.repository';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads/products',
      storage: diskStorage({
        destination: (req, file, callback) => {
          callback(null, './uploads/products');
        },
        filename: (req, file, callback) => {
          callback(null, file.originalname);
        },
      }),
    }),
    TypeOrmModule.forFeature([ProductTypeorm]),
  ],
  controllers: [ProductController],
  providers: [
    ProductCreate,
    { provide: ProductRepository, useClass: ProductTypeormRepository },
  ],
})
export class ProductModule {}

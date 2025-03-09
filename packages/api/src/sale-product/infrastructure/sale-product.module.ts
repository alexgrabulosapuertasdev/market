import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleProductTypeorm } from './persistence/entity/sale-product-typeorm.entity';
import { SaleProductTypeormRepository } from './persistence/sale-product-typeorm.repository';
import { SaleProductRepository } from '../domain/ports/sale-product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SaleProductTypeorm])],
  providers: [
    { provide: SaleProductRepository, useClass: SaleProductTypeormRepository },
  ],
  exports: [
    TypeOrmModule.forFeature([SaleProductTypeorm]),
    { provide: SaleProductRepository, useClass: SaleProductTypeormRepository },
  ],
})
export class SaleProductModule {}

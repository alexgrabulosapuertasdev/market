import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleController } from './sale.controller';
import { SaleCreate } from '../application/create/sale.create';
import { SaleTypeorm } from './persistence/entity/sale-typeorm.entity';
import { SaleTypeormRepository } from './persistence/sale-typeorm.repository';
import { SaleProductModule } from '../../sale-product/infrastructure/sale-product.module';
import { SaleRepository } from '../domain/ports/sale.repository';
import { ProductModule } from '../../product/infrastructure/product.module';
import { UserModule } from '../../user/infrastructure/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SaleTypeorm]),
    UserModule,
    ProductModule,
    SaleProductModule,
  ],
  controllers: [SaleController],
  providers: [
    SaleCreate,
    { provide: SaleRepository, useClass: SaleTypeormRepository },
  ],
})
export class SaleModule {}

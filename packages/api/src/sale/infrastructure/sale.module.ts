import { Module } from '@nestjs/common';
import { SaleController } from './sale.controller';
import { SaleCreate } from '../application/create/sale.create';
import { SaleRepository } from '../domain/ports/sale.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SaleMongoose,
  SaleSchema,
} from './persistence/entity/sale-mongoose.model';
import { SaleMongooseRepository } from './persistence/sale-mongoose.repository';
import { SaleMongodbConfig } from './persistence/sale-mongodb.config';
import { ProductModule } from '../../product/infrastructure/product.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
      isGlobal: true,
    }),
    SaleMongodbConfig.createConnection(),
    MongooseModule.forFeature(
      [
        {
          name: SaleMongoose.name,
          schema: SaleSchema,
          collection: 'sale',
        },
      ],
      'sale',
    ),
    ProductModule,
  ],
  controllers: [SaleController],
  providers: [
    SaleCreate,
    { provide: SaleRepository, useClass: SaleMongooseRepository },
  ],
})
export class SaleModule {}

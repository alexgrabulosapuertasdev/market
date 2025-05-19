import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CartController } from './cart.controller';
import { CartMongodbConfig } from './persistence/cart-mongodb.config';
import {
  CartMongoose,
  CartSchema,
} from './persistence/entity/cart-mongoose.model';
import { CartMongooseRepostiory } from './persistence/cart-mongoose.repository';
import { CartRepository } from '../domain/ports/cart.repository';
import { CartUpdate } from '../application/update/cart.update';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
      isGlobal: true,
    }),
    CartMongodbConfig.createConnection(),
    MongooseModule.forFeature(
      [
        {
          name: CartMongoose.name,
          schema: CartSchema,
          collection: 'cart',
        },
      ],
      'cart',
    ),
  ],
  controllers: [CartController],
  providers: [
    CartUpdate,
    { provide: CartRepository, useClass: CartMongooseRepostiory },
  ],
})
export class CartModule {}

import { Injectable } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Injectable()
export class CartMongodbConfig {
  static createConnection() {
    return MongooseModule.forRoot(
      `mongodb://${process.env['CART_MONGODB_HOST']}:${process.env['CART_MONGODB_PORT']}`,
      {
        user: process.env['CART_MONGODB_USERNAME'],
        pass: process.env['CART_MONGODB_PASSWORD'],
        dbName: process.env['CART_MONGODB_NAME'],
        connectionName: 'cart',
      },
    );
  }
}

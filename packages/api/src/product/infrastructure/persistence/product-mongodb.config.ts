import { Injectable } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Injectable()
export class ProductMongodbConfig {
  static createConnection() {
    return MongooseModule.forRoot(
      `mongodb://${process.env['PRODUCT_MONGODB_HOST']}:${process.env['PRODUCT_MONGODB_PORT']}`,
      {
        user: process.env['PRODUCT_MONGODB_USERNAME'],
        pass: process.env['PRODUCT_MONGODB_PASSWORD'],
        dbName: process.env['PRODUCT_MONGODB_NAME'],
        connectionName: 'product',
      },
    );
  }
}

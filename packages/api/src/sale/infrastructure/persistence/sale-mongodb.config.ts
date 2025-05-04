import { Injectable } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Injectable()
export class SaleMongodbConfig {
  static createConnection() {
    return MongooseModule.forRoot(
      `mongodb://${process.env['SALE_MONGODB_HOST']}:${process.env['SALE_MONGODB_PORT']}`,
      {
        user: process.env['SALE_MONGODB_USERNAME'],
        pass: process.env['SALE_MONGODB_PASSWORD'],
        dbName: process.env['SALE_MONGODB_NAME'],
        connectionName: 'sale',
      },
    );
  }
}

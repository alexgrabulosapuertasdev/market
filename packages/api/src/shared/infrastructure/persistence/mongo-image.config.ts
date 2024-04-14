import { Injectable } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Injectable()
export class MongoImageConfig {
  static createConnection() {
    return MongooseModule.forRoot(
      `mongodb://${process.env['MONGODB_IMAGE_HOST']}:${process.env['MONGODB_IMAGE_PORT']}`,
      {
        user: process.env['MONGODB_IMAGE_USERNAME'],
        pass: process.env['MONGODB_IMAGE_PASSWORD'],
        dbName: process.env['MONGODB_IMAGE_NAME'],
      },
    );
  }
}

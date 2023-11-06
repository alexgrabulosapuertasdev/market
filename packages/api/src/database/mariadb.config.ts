import { Injectable } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Injectable()
export class MariadbConfig {
  static createConnection() {
    return TypeOrmModule.forRoot({
      type: 'mariadb',
      database: process.env['DATABASE_NAME'],
      username: process.env['DATABASE_USERNAME'],
      password: process.env['DATABASE_PASSWORD'],
      port: Number(process.env['DATABASE_PORT']),
      host: process.env['DATABASE_HOST'],
      synchronize: true,
      entities: [join(__dirname, '..', '**', 'entity', '*.entity{.ts,.js}')],
    });
  }
}

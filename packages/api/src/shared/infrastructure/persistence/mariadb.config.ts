import { Injectable } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Injectable()
export class MariadbConfig {
  static createConnection() {
    return TypeOrmModule.forRoot({
      type: 'mariadb',
      database: process.env['MARIADB_NAME'],
      username: process.env['MARIADB_USERNAME'],
      password: process.env['MARIADB_PASSWORD'],
      port: Number(process.env['MARIADB_PORT']),
      host: process.env['MARIADB_HOST'],
      synchronize: true,
      entities: [
        join(__dirname, '..', '..', '..', '**', 'entity', '*.entity{.ts,.js}'),
      ],
    });
  }
}

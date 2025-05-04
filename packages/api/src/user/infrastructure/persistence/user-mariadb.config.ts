import { Injectable } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeorm } from './entity/user-typeorm.entity';

@Injectable()
export class UserMariadbConfig {
  static createConnection() {
    return TypeOrmModule.forRoot({
      type: 'mariadb',
      database: process.env['USER_MARIADB_NAME'],
      username: process.env['USER_MARIADB_USERNAME'],
      password: process.env['USER_MARIADB_PASSWORD'],
      port: Number(process.env['USER_MARIADB_PORT']),
      host: process.env['USER_MARIADB_HOST'],
      synchronize: true,
      entities: [UserTypeorm],
    });
  }
}

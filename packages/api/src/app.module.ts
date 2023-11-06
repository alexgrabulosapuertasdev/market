import { Module } from '@nestjs/common';
import { MariadbConfig } from './database/mariadb.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MariadbConfig.createConnection(),
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { MariadbConfig } from './shared/infrastructure/persistence/mariadb.config';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/infrastructure/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MariadbConfig.createConnection(),
    UserModule,
  ],
})
export class AppModule {}

import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { MariadbConfig } from './shared/infrastructure/persistence/mariadb.config';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/infrastructure/auth.module';
import { ProductModule } from './product/infrastructure/product.module';
import { SaleModule } from './sale/infrastructure/sale.module';
import { UserModule } from './user/infrastructure/user.module';
import { MongoImageConfig } from './shared/infrastructure/persistence/mongo-image.config';
import { RedisConfig } from './shared/infrastructure/persistence/redis.config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    CacheModule.registerAsync(RedisConfig.createConnection()),
    AuthModule,
    MariadbConfig.createConnection(),
    MongoImageConfig.createConnection(),
    ProductModule,
    UserModule,
    SaleModule,
  ],
})
export class AppModule {}

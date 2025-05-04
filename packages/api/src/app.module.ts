import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/infrastructure/auth.module';
import { ProductModule } from './product/infrastructure/product.module';
import { SaleModule } from './sale/infrastructure/sale.module';
import { UserModule } from './user/infrastructure/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    AuthModule,
    ProductModule,
    UserModule,
    SaleModule,
  ],
})
export class AppModule {}

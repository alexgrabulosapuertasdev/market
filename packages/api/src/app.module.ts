import { Module } from '@nestjs/common';
import { AuthModule } from './auth/infrastructure/auth.module';
import { CartModule } from './cart/infrastructure/cart.module';
import { ProductModule } from './product/infrastructure/product.module';
import { SaleModule } from './sale/infrastructure/sale.module';
import { UserModule } from './user/infrastructure/user.module';

@Module({
  imports: [AuthModule, CartModule, ProductModule, UserModule, SaleModule],
})
export class AppModule {}

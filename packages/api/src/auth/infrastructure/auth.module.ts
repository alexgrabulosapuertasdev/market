import { Module } from '@nestjs/common';
import { AuthSignIn } from '../application/sign-in/auth.sign-in';
import { UserModule } from '../../user/infrastructure/user.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guard/auth.guard';
import { JwtConstants } from './constants/jwt.constants';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: JwtConstants.SECRET,
      signOptions: { expiresIn: JwtConstants.EXPIRATION_TIME },
    }),
    UserModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AuthSignIn,
  ],
  controllers: [AuthController],
})
export class AuthModule {}

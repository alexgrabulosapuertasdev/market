import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtConstants } from '../constants/jwt.constants';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { Unauthorized } from '../../../shared/domain/exception/unauthorized';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<true> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromCookie(request);

    if (!token) {
      throw new Unauthorized('Invalid token');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: JwtConstants.SECRET,
      });

      request['user'] = payload;
    } catch {
      throw new Unauthorized('Invalid verification');
    }

    return true;
  }

  private extractTokenFromCookie(request: Request): string | undefined {
    return request.cookies?.auth_token;
  }
}

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthSignInRequest } from './auth.sign-in.request';
import { AuthResponse } from '../../domain/interfaces/auth.response';
import { Unauthorized } from '../../../shared/domain/exception/unauthorized';
import { UserRepository } from '../../../user/domain/ports/user.repository';
import { compareHash } from '../../../shared/domain/encrypt/encrypt';

@Injectable()
export class AuthSignIn {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async run(credentials: AuthSignInRequest): Promise<AuthResponse> {
    const { name, password } = credentials;

    const user = await this.userRepository.findOneByName(name);
    const userPrimitives = user.toPrimitives();

    const passwordIsValid: boolean = await compareHash(
      password,
      userPrimitives.password,
    );

    if (!passwordIsValid) {
      throw new Unauthorized('Invalid password');
    }

    const payload = {
      id: userPrimitives.id,
      name: userPrimitives.name,
      role: userPrimitives.role,
    };

    return { token: await this.jwtService.signAsync(payload) };
  }
}

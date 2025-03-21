import { Body, Controller, Post } from '@nestjs/common';
import { AuthSignInDto } from './dto/auth-sign-in.dto';
import { AuthSignIn } from '../application/sign-in/auth.sign-in';
import { Public } from './decorators/public.decorator';
import { AuthResponse } from '../domain/interfaces/auth.response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authSignIn: AuthSignIn) {}

  @Public()
  @Post('login')
  async signIn(@Body() signInDto: AuthSignInDto): Promise<AuthResponse> {
    return this.authSignIn.run(signInDto);
  }
}

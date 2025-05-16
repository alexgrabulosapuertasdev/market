import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthSignInDto } from './dto/auth-sign-in.dto';
import { AuthSignIn } from '../application/sign-in/auth.sign-in';
import { Public } from './decorators/public.decorator';
import { Request, Response } from 'express';
import { AuthResponseDTO } from './dto/auth-response.dto';
import { AuthGuard } from './guard/auth.guard';
import { USER_ROLE } from 'src/user/domain/enum/user.role';

@Controller('auth')
export class AuthController {
  constructor(private readonly authSignIn: AuthSignIn) {}

  @Post('login')
  @Public()
  async signIn(
    @Body() signInDto: AuthSignInDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponseDTO> {
    const { token } = await this.authSignIn.run(signInDto);

    const isSecureEnv = ['production', 'pre', 'staging'].includes(
      process.env.NODE_ENV,
    );

    const oneDayInMiliseconds = 1000 * 60 * 60 * 24;
    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: isSecureEnv,
      sameSite: isSecureEnv ? 'none' : 'lax',
      maxAge: oneDayInMiliseconds,
    });

    return { message: 'Login successful' };
  }

  @Get('me')
  @UseGuards(AuthGuard)
  getProfile(@Req() req: Request): { role: USER_ROLE } {
    const user = req['user'];

    return { role: user.role };
  }

  @Post('logout')
  @Public()
  logout(@Res({ passthrough: true }) res: Response): AuthResponseDTO {
    res.clearCookie('auth_token');

    return { message: 'Logout successful' };
  }
}

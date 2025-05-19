import { Body, Controller, Put, Req } from '@nestjs/common';
import { Request } from 'express';
import { CartUpdateDTO } from './dto/cart-update.dto';
import { CartUpdate } from '../application/update/cart.update';
import { getUserIdFromCookies } from '../../auth/infrastructure/session/session.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartUpdate: CartUpdate) {}

  @Put()
  async update(
    @Body() cartUpdateDTO: CartUpdateDTO,
    @Req() req: Request,
  ): Promise<void> {
    const userId = getUserIdFromCookies(req.cookies);
    const cartRequest = {
      userId,
      ...cartUpdateDTO,
    };

    return await this.cartUpdate.run(cartRequest);
  }
}

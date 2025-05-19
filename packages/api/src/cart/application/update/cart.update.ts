import { Injectable } from '@nestjs/common';
import { CartUpdateRequest } from './cart.update.request';
import { Cart } from '../../domain/aggregates/cart';
import { CartRepository } from '../../domain/ports/cart.repository';

@Injectable()
export class CartUpdate {
  constructor(private readonly cartRepository: CartRepository) {}

  async run(cartUpdateRequest: CartUpdateRequest): Promise<void> {
    const cart = Cart.create(cartUpdateRequest);

    await this.cartRepository.save(cart);
  }
}

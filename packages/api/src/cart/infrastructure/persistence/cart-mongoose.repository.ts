import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CartMongoose } from './entity/cart-mongoose.model';
import { Cart } from '../../domain/aggregates/cart';
import { CartRepository } from '../../domain/ports/cart.repository';

@Injectable()
export class CartMongooseRepostiory implements CartRepository {
  constructor(
    @InjectModel(CartMongoose.name, 'cart')
    private readonly cartModel: Model<CartMongoose>,
  ) {}

  async save(cart: Cart): Promise<Cart> {
    const { userId, products } = cart.toPrimitives();

    const cartSaved = await this.cartModel.findOneAndUpdate(
      { userId },
      { products },
      { upsert: true, new: true },
    );

    return Cart.create(cartSaved);
  }
}

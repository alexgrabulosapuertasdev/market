import { Test, TestingModule } from '@nestjs/testing';
import { CartUpdate } from './cart.update';
import { CartMother } from '../../domain/mothers/cart.mother';
import { CartRepository } from '../../domain/ports/cart.repository';

describe('CartUpdate', () => {
  let cartUpdate: CartUpdate;
  let cartRepository: jest.Mocked<CartRepository>;
  let testingModule: TestingModule;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      providers: [
        CartUpdate,
        { provide: CartRepository, useValue: { save: jest.fn() } },
      ],
    }).compile();

    cartUpdate = testingModule.get<CartUpdate>(CartUpdate);
    cartRepository = testingModule.get(CartRepository);
  });

  afterAll(async () => {
    await testingModule.close();
  });

  it('should be defined', () => {
    expect(cartUpdate).toBeDefined();
  });

  it('should update the cart', async () => {
    const cart = CartMother.create();
    cartRepository.save.mockResolvedValue(cart);

    const response = await cartUpdate.run(cart.toPrimitives());

    expect(cartRepository.save).toHaveBeenCalledWith(cart);
    expect(response).toBeUndefined();
  });
});

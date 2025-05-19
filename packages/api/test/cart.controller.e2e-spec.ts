import { HttpStatus, INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import * as cookieParser from 'cookie-parser';
import * as jwt from 'jsonwebtoken';
import { Model } from 'mongoose';
import * as request from 'supertest';
import { JwtConstants } from '../src/auth/infrastructure/constants/jwt.constants';
import { CartMother } from '../src/cart/domain/mothers/cart.mother';
import { CartModule } from '../src/cart/infrastructure/cart.module';
import { CartMongoose } from '../src/cart/infrastructure/persistence/entity/cart-mongoose.model';

describe('CartController (e2e)', () => {
  let app: INestApplication;
  let testingModule: TestingModule;
  let cartRepository: Model<CartMongoose>;

  beforeAll(async () => {
    testingModule = await Test.createTestingModule({
      imports: [CartModule],
    }).compile();

    cartRepository = testingModule.get(
      getModelToken(CartMongoose.name, 'cart'),
    );

    app = testingModule.createNestApplication();
    app.use(cookieParser());
    await app.init();
  });

  const cleanupDatabase = async () => {
    await cartRepository.deleteMany({});
  };

  beforeEach(async () => {
    await cleanupDatabase();
  });

  afterAll(async () => {
    await cleanupDatabase();
    await app.close();
    await testingModule.close();
  });

  describe('PUT /', () => {
    it('should update the cart by user', async () => {
      const { userId, products } = CartMother.create().toPrimitives();

      const token = jwt.sign({ id: userId }, JwtConstants.SECRET, {
        expiresIn: '1d',
      });

      await request(app.getHttpServer())
        .put('/cart')
        .set('Cookie', [`auth_token=${token}`])
        .send({ products })
        .expect(HttpStatus.OK);

      const response = await cartRepository.find({ userId });

      expect(response.length).toBe(1);
      const cartResponse = response[0];
      expect(cartResponse._id).toBeDefined();
      expect(cartResponse.userId).toBe(userId);
      expect(cartResponse.products).toEqual(products);
    });
  });
});

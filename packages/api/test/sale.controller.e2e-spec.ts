import { HttpStatus, INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import * as cookieParser from 'cookie-parser';
import * as jwt from 'jsonwebtoken';
import { Model } from 'mongoose';
import * as request from 'supertest';
import { AuthSignIn } from '../src/auth/application/sign-in/auth.sign-in';
import { JwtConstants } from '../src/auth/infrastructure/constants/jwt.constants';
import { ProductMother } from '../src/product/domain/mothers/product.mother';
import { ProductMongoose } from '../src/product/infrastructure/persistence/entity/product-mongoose.model';
import { SaleModule } from '../src/sale/infrastructure/sale.module';
import { SaleProductQuantityMother } from '../src/sale/domain/mothers/sale-product-quantity.mother';
import { UserIdMother } from '../src/user/domain/mothers/user-id.mother';
import { SaleCreateDto } from '../src/sale/infrastructure/dto/sale-create.dto';
import { SaleMongoose } from '../src/sale/infrastructure/persistence/entity/sale-mongoose.model';

describe('SaleController (e2e)', () => {
  let app: INestApplication;
  let testingModule: TestingModule;
  let saleRepository: Model<SaleMongoose>;
  let productRepository: Model<ProductMongoose>;

  beforeAll(async () => {
    const authSignInMock = {
      run: jest.fn().mockResolvedValue({ token: 'token' }),
    };
    testingModule = await Test.createTestingModule({
      imports: [SaleModule],
    })
      .overrideProvider(AuthSignIn)
      .useValue(authSignInMock)
      .compile();

    saleRepository = testingModule.get<Model<SaleMongoose>>(
      getModelToken(SaleMongoose.name, 'sale'),
    );

    productRepository = testingModule.get<Model<ProductMongoose>>(
      getModelToken(ProductMongoose.name, 'product'),
    );

    app = testingModule.createNestApplication();
    app.use(cookieParser());
    await app.init();
  });

  const cleanupDatabase = async () => {
    await saleRepository.deleteMany({});
    await productRepository.deleteMany({});
  };

  beforeEach(async () => {
    await cleanupDatabase();
  });

  afterAll(async () => {
    await cleanupDatabase();
    await app.close();
    await testingModule.close();
  });

  describe('POST /', () => {
    it('should create a sale and his salesProducts', async () => {
      const userId = UserIdMother.create().value;
      const products = [
        ProductMother.create().toPrimitives(),
        ProductMother.create().toPrimitives(),
      ].sort((a, b) => a.id.localeCompare(b.id));

      const saleCreateDto: SaleCreateDto = {
        products: products.map((product) => ({
          productId: product.id,
          quantity: SaleProductQuantityMother.create().value,
        })),
      };

      const token = jwt.sign({ id: userId }, JwtConstants.SECRET, {
        expiresIn: '1d',
      });

      await productRepository.insertMany(products);

      const { body, status } = await request(app.getHttpServer())
        .post('/sale')
        .set('Cookie', [`auth_token=${token}`])
        .send(saleCreateDto);

      expect(status).toBe(HttpStatus.CREATED);
      expect(body.id).toBeDefined();
      const responseDate = new Date(body.date).getTime();
      const now = Date.now();
      expect(Math.abs(responseDate - now)).toBeLessThanOrEqual(1000);
      expect(body.totalAmount).toBe(
        saleCreateDto.products[0].quantity * products[0].price +
          saleCreateDto.products[1].quantity * products[1].price,
      );
      expect(body.userId).toBe(userId);
      expect(body.products.length).toBe(2);

      const saleProducts = body.products.sort((a, b) =>
        a.productId.localeCompare(b.productId),
      );

      expect(saleProducts).toEqual(
        products.map(({ image: { data, ...image }, id, ...product }, i) => {
          const quantity = saleCreateDto.products[i].quantity;
          delete product.stock;

          return {
            ...product,
            productId: id,
            quantity,
            totalAmount: product.price * quantity,
            image: {
              ...image,
              base64: data.toString('base64'),
            },
          };
        }),
      );
    });
  });
});

import { faker } from '@faker-js/faker';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import * as request from 'supertest';
import { AuthSignIn } from '../src/auth/application/sign-in/auth.sign-in';
import { ProductMother } from '../src/product/domain/mothers/product.mother';
import { ProductNameMother } from '../src/product/domain/mothers/product-name.mother';
import { ProductMongoose } from '../src/product/infrastructure/persistence/entity/product-mongoose.model';
import { ProductModule } from '../src/product/infrastructure/product.module';

describe('ProductController (e2e)', () => {
  let app: INestApplication;
  let testingModule: TestingModule;
  let productRepository: Model<ProductMongoose>;

  beforeAll(async () => {
    const authSignInMock = {
      run: jest.fn().mockResolvedValue({ token: 'token' }),
    };
    testingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ envFilePath: '.env.test' }),
        ProductModule,
      ],
    })
      .overrideProvider(AuthSignIn)
      .useValue(authSignInMock)
      .compile();

    productRepository = testingModule.get<Model<ProductMongoose>>(
      getModelToken(ProductMongoose.name, 'product'),
    );

    app = testingModule.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    await productRepository.deleteMany({});
  });

  afterAll(async () => {
    await productRepository.deleteMany({});
    await app.close();
    await testingModule.close();
  });

  describe('GET /', () => {
    it('should return an array of products', async () => {
      const products = [
        ProductMother.create().toPrimitives(),
        ProductMother.create().toPrimitives(),
      ].sort((a, b) => a.id.localeCompare(b.id));

      await productRepository.insertMany(products);

      const { body, status } = await request(app.getHttpServer()).get(
        '/product',
      );

      expect(status).toBe(HttpStatus.OK);

      const response = body.sort((a, b) => a.id.localeCompare(b.id));
      expect(response).toEqual(
        products.map(({ image, ...product }) => ({
          ...product,
          image: {
            originalname: image.originalname,
            mimetype: image.mimetype,
            size: image.size,
            base64: image.data.toString('base64'),
          },
        })),
      );
    });
  });

  describe('GET /?filter', () => {
    it('should return an array of products filtered', async () => {
      const filter = ProductNameMother.create().value;
      const validProducts = [
        ProductMother.create({ name: filter }).toPrimitives(),
        ProductMother.create({ name: filter }).toPrimitives(),
        ProductMother.create({ name: filter + '2' }).toPrimitives(),
      ].sort((a, b) => a.id.localeCompare(b.id));
      const products = [
        ...validProducts,
        ProductMother.create({ name: 'UNVALID' }).toPrimitives(),
      ];

      await productRepository.insertMany(products);

      const { body, status } = await request(app.getHttpServer()).get(
        `/product?filter=${filter}`,
      );

      expect(status).toBe(HttpStatus.OK);

      const response = body.sort((a, b) => a.id.localeCompare(b.id));
      expect(response).toEqual(
        validProducts.map(({ image, ...product }) => ({
          ...product,
          image: {
            originalname: image.originalname,
            mimetype: image.mimetype,
            size: image.size,
            base64: image.data.toString('base64'),
          },
        })),
      );
    });
  });

  describe('GET /:id', () => {
    it('should return a product by id', async () => {
      const {
        image: { data, ...image },
        ...product
      } = ProductMother.create().toPrimitives();

      await productRepository.insertOne({
        ...product,
        image: { data, ...image },
      });

      const { body, status } = await request(app.getHttpServer()).get(
        `/product/${product.id}`,
      );

      expect(status).toBe(HttpStatus.OK);
      expect(body).toEqual({
        ...product,
        image: {
          ...image,
          base64: data.toString('base64'),
        },
      });
    });
  });

  describe('POST /', () => {
    it('should create a product', async () => {
      const { name, description, category, price, stock } =
        ProductMother.create().toPrimitives();
      const imageOriginalname = 'image.jpg';
      const imageBuffer = Buffer.from(faker.image.avatar());

      const { body, status } = await request(app.getHttpServer())
        .post('/product')
        .set('Content-Type', 'multipart/form-data')
        .field('name', name)
        .field('description', description)
        .field('category', category)
        .field('price', price)
        .field('stock', stock)
        .attach('image', imageBuffer, { filename: imageOriginalname });

      expect(status).toBe(HttpStatus.CREATED);
      expect(body.id).toBeDefined();
      expect(body.name).toBe(name);
      expect(body.description).toBe(description);
      expect(body.category).toBe(category);
      expect(body.price).toBe(price);
      expect(body.stock).toBe(stock);
      expect(body.image.originalname).toBe(imageOriginalname);
      expect(body.image.mimetype).toBe('image/jpeg');
      expect(body.image.size).toBeDefined();
      expect(body.image.base64).toBe(imageBuffer.toString('base64'));
    });
  });
});

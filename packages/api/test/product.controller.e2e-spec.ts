import { faker } from '@faker-js/faker';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { ProductMother } from '../src/product/domain/mothers/product.mother';
import { ProductTypeorm } from '../src/product/infrastructure/persistence/entity/product-typeorm.entity';
import { MariadbConfig } from '../src/shared/infrastructure/persistence/mariadb.config';
import { MongoImageConfig } from '../src/shared/infrastructure/persistence/mongo-image.config';
import { ProductModule } from '../src/product/infrastructure/product.module';

describe('ProductController (e2e)', () => {
  let app: INestApplication;
  let testingModule: TestingModule;
  let productRepository: Repository<ProductTypeorm>;

  beforeAll(async () => {
    testingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ envFilePath: '.env.test' }),
        MariadbConfig.createConnection(),
        MongoImageConfig.createConnection(),
        ProductModule,
      ],
    }).compile();

    productRepository = testingModule.get<Repository<ProductTypeorm>>(
      getRepositoryToken(ProductTypeorm),
    );

    app = testingModule.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    await productRepository.query('DELETE FROM product;');
  });

  afterAll(async () => {
    await productRepository.query('DELETE FROM product;');
    await app.close();
    await testingModule.close();
  });

  describe('GET /', () => {
    it('should return an array of products', async () => {
      const products = [
        ProductMother.create().toPrimitives(),
        ProductMother.create().toPrimitives(),
      ].sort((a, b) => a.id.localeCompare(b.id));

      await productRepository.save(products);

      const { body, status } = await request(app.getHttpServer()).get(
        '/product',
      );

      expect(status).toBe(HttpStatus.OK);

      const response = body.sort((a, b) => a.id.localeCompare(b.id));
      expect(
        response.map(({ image, ...product }) => ({
          ...product,
          image: {
            originalname: image.originalname,
            mimetype: image.mimetype,
            size: image.size,
            base64: image.base64,
          },
        })),
      ).toEqual(products);
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

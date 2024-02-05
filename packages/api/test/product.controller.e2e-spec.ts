import { HttpStatus, INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { resolve } from 'path';
import { read, readFileSync } from 'fs';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { ProductMother } from '../src/product/domain/mothers/product.mother';
import { ProductTypeorm } from '../src/product/infrastructure/persistence/entity/product-typeorm.entity';
import { MariadbConfig } from '../src/shared/infrastructure/persistence/mariadb.config';
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

  describe('POST /', () => {
    it('should create a product', async () => {
      const imageOriginalname = 'image-to-test.jpg';
      const { name, description, category, price, stock } =
        ProductMother.create().toPrimitives();
      const imagePath = resolve('test', imageOriginalname);
      const image = readFileSync(imagePath);
      const imageBase64 = Buffer.from(image).toString('base64');

      const { body, status } = await request(app.getHttpServer())
        .post('/product')
        .set('Content-Type', 'multipart/form-data')
        .field('name', name)
        .field('description', description)
        .field('category', category)
        .field('price', price)
        .field('stock', stock)
        .attach('image', imagePath);

      expect(status).toBe(HttpStatus.CREATED);
      expect(body.id).toBeDefined();
      expect(body.name).toBe(name);
      expect(body.description).toBe(description);
      expect(body.category).toBe(category);
      expect(body.price).toBe(price);
      expect(body.stock).toBe(stock);
      expect(body.imageOriginalname).toBe(imageOriginalname);
      expect(body.imageBase64).toBe(imageBase64);
      expect(
        readFileSync(resolve('uploads', 'products', imageOriginalname)),
      ).toEqual(image);
    });
  });
});

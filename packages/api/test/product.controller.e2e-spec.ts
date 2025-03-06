import { faker } from '@faker-js/faker';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { ProductMother } from '../src/product/domain/mothers/product.mother';
import { ProductNameMother } from '../src/product/domain/mothers/product-name.mother';
import { ProductTypeorm } from '../src/product/infrastructure/persistence/entity/product-typeorm.entity';
import { MariadbConfig } from '../src/shared/infrastructure/persistence/mariadb.config';
import { MongoImageConfig } from '../src/shared/infrastructure/persistence/mongo-image.config';
import { ProductModule } from '../src/product/infrastructure/product.module';
import { ProductImageMongoose } from '../src/product/infrastructure/persistence/entity/product-image-mongoose.model';
import { Model } from 'mongoose';

describe('ProductController (e2e)', () => {
  let app: INestApplication;
  let testingModule: TestingModule;
  let productRepository: Repository<ProductTypeorm>;
  let productImageModel: Model<ProductImageMongoose>;

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

    productImageModel = testingModule.get<Model<ProductImageMongoose>>(
      getModelToken(ProductImageMongoose.name),
    );

    app = testingModule.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    await productRepository.query('DELETE FROM product;');
    await productImageModel.deleteMany({});
  });

  afterAll(async () => {
    await productRepository.query('DELETE FROM product;');
    await productImageModel.deleteMany({});
    await app.close();
    await testingModule.close();
  });

  describe('GET /', () => {
    it('should return an array of products', async () => {
      const products = [
        ProductMother.create().toPrimitives(),
        ProductMother.create().toPrimitives(),
      ].sort((a, b) => a.id.localeCompare(b.id));

      await productRepository.save(
        products.map(({ id, name, description, category, price, stock }) => ({
          id,
          name,
          description,
          category,
          price,
          stock,
        })),
      );

      await productImageModel.insertMany(
        products.map(({ id, image }) => ({
          productId: id,
          originalname: image.originalname,
          mimetype: image.mimetype,
          size: image.size,
          base64: image.base64,
        })),
      );

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

      await productRepository.save(
        products.map(({ id, name, description, category, price, stock }) => ({
          id,
          name,
          description,
          category,
          price,
          stock,
        })),
      );

      await productImageModel.insertMany(
        products.map(({ id, image }) => ({
          productId: id,
          originalname: image.originalname,
          mimetype: image.mimetype,
          size: image.size,
          base64: image.base64,
        })),
      );

      const { body, status } = await request(app.getHttpServer()).get(
        `/product?filter=${filter}`,
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
      ).toEqual(validProducts);
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

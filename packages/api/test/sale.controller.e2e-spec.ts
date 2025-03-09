import { HttpStatus, INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { SaleTypeorm } from '../src/sale/infrastructure/persistence/entity/sale-typeorm.entity';
import { SaleModule } from '../src/sale/infrastructure/sale.module';
import { MariadbConfig } from '../src/shared/infrastructure/persistence/mariadb.config';
import { MongoImageConfig } from '../src/shared/infrastructure/persistence/mongo-image.config';
import { UserMother } from '../src/user/domain/mothers/user.mother';
import { UserTypeorm } from '../src/user/infrastructure/persistence/entity/user-typeorm.entity';
import { ProductMother } from '../src/product/domain/mothers/product.mother';
import { ProductTypeorm } from '../src/product/infrastructure/persistence/entity/product-typeorm.entity';
import { SaleDateMother } from '../src/sale/domain/mothers/sale-date.mother';
import { SaleProductQuantityMother } from '../src/sale-product/domain/mothers/sale-product-quantity.mother';

describe('SaleController (e2e)', () => {
  let app: INestApplication;
  let testingModule: TestingModule;
  let saleRepository: Repository<SaleTypeorm>;
  let userRepository: Repository<UserTypeorm>;
  let productRepository: Repository<ProductTypeorm>;

  beforeAll(async () => {
    testingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ envFilePath: '.env.test' }),
        MariadbConfig.createConnection(),
        MongoImageConfig.createConnection(),
        SaleModule,
      ],
    }).compile();

    saleRepository = testingModule.get<Repository<SaleTypeorm>>(
      getRepositoryToken(SaleTypeorm),
    );
    userRepository = testingModule.get<Repository<UserTypeorm>>(
      getRepositoryToken(UserTypeorm),
    );
    productRepository = testingModule.get<Repository<ProductTypeorm>>(
      getRepositoryToken(ProductTypeorm),
    );

    app = testingModule.createNestApplication();
    await app.init();
  });

  const cleanupDatabase = async () => {
    await saleRepository.query('DELETE FROM sale_product;');
    await saleRepository.query('DELETE FROM sale;');
    await saleRepository.query('DELETE FROM product;');
    await saleRepository.query('DELETE FROM user;');
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
      const user = UserMother.create().toPrimitives();
      const products = [
        ProductMother.create().toPrimitives(),
        ProductMother.create().toPrimitives(),
      ].sort((a, b) => a.id.localeCompare(b.id));

      await Promise.all([
        userRepository.save({ ...user }),
        productRepository.save([...products]),
      ]);

      const saleCreateDto = {
        date: new Date(SaleDateMother.create().value.setMilliseconds(0)),
        userId: user.id,
        products: [
          {
            productId: products[0].id,
            quantity: SaleProductQuantityMother.create().value,
          },
          {
            productId: products[1].id,
            quantity: SaleProductQuantityMother.create().value,
          },
        ],
      };

      const { body, status } = await request(app.getHttpServer())
        .post('/sale')
        .send(saleCreateDto);

      expect(status).toBe(HttpStatus.CREATED);
      expect(body.id).toBeDefined();
      expect(new Date(body.date).getTime()).toBe(saleCreateDto.date.getTime());
      expect(body.totalAmount).toBe(
        saleCreateDto.products[0].quantity * products[0].price +
          saleCreateDto.products[1].quantity * products[1].price,
      );
      expect(body.user.id).toBe(saleCreateDto.userId);
      expect(body.user.name).toBeDefined();
      expect(body.saleProducts.length).toBe(2);

      const saleProducts = body.saleProducts.sort((a, b) =>
        a.productId.localeCompare(b.productId),
      );
      const saleProductsLength = saleProducts.length;

      for (let i = 0; i < saleProductsLength; i++) {
        expect(saleProducts[i].id).toBeDefined();
        expect(saleProducts[i].name).toBe(products[i].name);
        expect(saleProducts[i].price).toBe(products[i].price);
        expect(saleProducts[i].quantity).toBe(
          saleCreateDto.products[i].quantity,
        );
        expect(saleProducts[i].totalAmount).toBe(
          products[i].price * saleCreateDto.products[i].quantity,
        );
        expect(saleProducts[i].productId).toBe(products[i].id);
      }
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ProductFindAll } from './product.find-all';
import { ProductRepository } from '../../domain/ports/product.repository';
import { ProductMother } from '../../domain/mothers/product.mother';

describe('ProductFindAll', () => {
  let productFindAll: ProductFindAll;
  let productRepository: jest.Mocked<ProductRepository>;
  let testingModule: TestingModule;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      providers: [
        ProductFindAll,
        { provide: ProductRepository, useValue: { findAll: jest.fn() } },
      ],
    }).compile();

    productFindAll = testingModule.get<ProductFindAll>(ProductFindAll);
    productRepository = testingModule.get(ProductRepository);
  });

  afterAll(async () => {
    await testingModule.close();
  });

  it('should return an array of products', async () => {
    const products = [ProductMother.create(), ProductMother.create()];
    productRepository.findAll.mockResolvedValue(products);

    const response = await productFindAll.run();

    expect(response).toEqual(products.map((product) => product.toPrimitives()));
  });

  it('should return an empty array if there are no products', async () => {
    productRepository.findAll.mockResolvedValue([]);

    const response = await productFindAll.run();

    expect(response).toEqual([]);
  });
});

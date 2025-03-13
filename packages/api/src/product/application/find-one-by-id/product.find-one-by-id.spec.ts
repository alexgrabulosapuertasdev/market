import { Test, TestingModule } from '@nestjs/testing';
import { ProductFindOneById } from './product.find-one-by-id';
import { ProductRepository } from '../../domain/ports/product.repository';
import { ProductMother } from '../../domain/mothers/product.mother';

describe('ProductFindOneById', () => {
  let productFindOneById: ProductFindOneById;
  let productRepository: jest.Mocked<ProductRepository>;
  let testingModule: TestingModule;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      providers: [
        ProductFindOneById,
        { provide: ProductRepository, useValue: { findOneById: jest.fn() } },
      ],
    }).compile();

    productFindOneById =
      testingModule.get<ProductFindOneById>(ProductFindOneById);
    productRepository = testingModule.get(ProductRepository);
  });

  afterAll(async () => {
    await testingModule.close();
  });

  it('should return a product by id', async () => {
    const products = ProductMother.create();
    productRepository.findOneById.mockResolvedValue(products);

    const response = await productFindOneById.run(products.toPrimitives().id);

    expect(response).toEqual(products.toPrimitives());
  });
});

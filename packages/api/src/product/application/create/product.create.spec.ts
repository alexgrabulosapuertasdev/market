import { Test, TestingModule } from '@nestjs/testing';
import { ProductCreate } from './product.create';
import { ProductMother } from '../../domain/mothers/product.mother';
import { ProductRepository } from '../../domain/ports/product.repository';

describe('ProductCreate', () => {
  let productCreate: ProductCreate;
  let productRepository: jest.Mocked<ProductRepository>;
  let testingModule: TestingModule;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      providers: [
        ProductCreate,
        { provide: ProductRepository, useValue: { save: jest.fn() } },
      ],
    }).compile();

    productCreate = testingModule.get<ProductCreate>(ProductCreate);
    productRepository = testingModule.get(ProductRepository);
  });

  afterAll(async () => {
    await testingModule.close();
  });

  it('should be defined', () => {
    expect(productCreate).toBeDefined();
  });

  it('should create a product', async () => {
    const product = ProductMother.create();
    productRepository.save.mockResolvedValue(product);
    const response = await productCreate.run(product.toPrimitives());

    expect(productRepository.save).toHaveBeenCalledWith(product);
    expect(response).toEqual(product.toPrimitives());
  });
});

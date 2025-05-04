import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { SaleCreate } from './sale.create';
import { SaleCreateRequest } from './sale.create.request';
import { SaleRepository } from '../../domain/ports/sale.repository';
import { ProductMother } from '../../../product/domain/mothers/product.mother';
import { ProductRepository } from '../../../product/domain/ports/product.repository';
import { SaleMother } from '../../../sale/domain/mothers/sale.mother';
import { SaleProductMother } from '../../../sale/domain/mothers/sale-products.mother';

describe('SaleCreate', () => {
  let saleCreate: SaleCreate;
  let saleRepository: jest.Mocked<SaleRepository>;
  let productRepository: jest.Mocked<ProductRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SaleCreate,
        { provide: SaleRepository, useValue: { save: jest.fn() } },
        { provide: ProductRepository, useValue: { findAllByIds: jest.fn() } },
      ],
    }).compile();

    saleCreate = module.get<SaleCreate>(SaleCreate);
    saleRepository = module.get(SaleRepository);
    productRepository = module.get(ProductRepository);
  });

  it('should create a sale successfully', async () => {
    const mockProduct = ProductMother.create();
    const mockSaleProduct = SaleProductMother.create({
      ...mockProduct.toPrimitives(),
      productId: mockProduct.toPrimitives().id,
    }).toPrimitives();

    const saleRequest: SaleCreateRequest = {
      id: randomUUID(),
      date: new Date(),
      userId: randomUUID(),
      products: [
        {
          productId: mockSaleProduct.productId,
          quantity: mockSaleProduct.quantity,
        },
      ],
    };

    const mockSale = SaleMother.create({
      id: saleRequest.id,
      date: saleRequest.date,
      userId: saleRequest.userId,
      products: [mockSaleProduct],
    });

    productRepository.findAllByIds.mockResolvedValue([mockProduct]);
    saleRepository.save.mockResolvedValue(mockSale);

    const result = await saleCreate.run(saleRequest);

    expect(result).toEqual(mockSale);
    expect(productRepository.findAllByIds).toHaveBeenCalledWith([
      saleRequest.products[0].productId,
    ]);
    expect(saleRepository.save).toHaveBeenCalledWith(mockSale);
  });
});

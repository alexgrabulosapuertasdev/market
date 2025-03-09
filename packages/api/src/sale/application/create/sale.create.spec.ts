import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { SaleCreate } from './sale.create';
import { SaleCreateRequest } from './sale.create.request';
import { SaleRepository } from '../../domain/ports/sale.repository';
import { ProductMother } from '../../../product/domain/mothers/product.mother';
import { ProductRepository } from '../../../product/domain/ports/product.repository';
import { SaleMother } from '../../../sale/domain/mothers/sale.mother';
import { SaleProductRepository } from '../../../sale-product/domain/ports/sale-product.repository';
import { SaleProductMother } from '../../../sale-product/domain/mothers/sale-product.mother';
import { UserMother } from '../../../user/domain/mothers/user.mother';
import { UserRepository } from '../../../user/domain/ports/user.repository';

describe('SaleCreate', () => {
  let saleCreate: SaleCreate;
  let saleRepository: jest.Mocked<SaleRepository>;
  let userRepository: jest.Mocked<UserRepository>;
  let productRepository: jest.Mocked<ProductRepository>;
  let saleProductRepository: jest.Mocked<SaleProductRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SaleCreate,
        { provide: SaleRepository, useValue: { save: jest.fn() } },
        { provide: UserRepository, useValue: { findOneById: jest.fn() } },
        { provide: ProductRepository, useValue: { findAllByIds: jest.fn() } },
        { provide: SaleProductRepository, useValue: { saveMany: jest.fn() } },
      ],
    }).compile();

    saleCreate = module.get<SaleCreate>(SaleCreate);
    saleRepository = module.get(SaleRepository);
    userRepository = module.get(UserRepository);
    productRepository = module.get(ProductRepository);
    saleProductRepository = module.get(SaleProductRepository);
  });

  it('should create a sale successfully', async () => {
    const saleRequest: SaleCreateRequest = {
      id: randomUUID(),
      date: new Date(),
      userId: randomUUID(),
      products: [{ productId: randomUUID(), quantity: 2 }],
    };

    const mockUser = UserMother.create({ id: saleRequest.userId });
    userRepository.findOneById.mockResolvedValue(mockUser);

    const mockProduct = ProductMother.create({
      id: saleRequest.products[0].productId,
    });
    productRepository.findAllByIds.mockResolvedValue([mockProduct]);

    const mockSaleProduct = SaleProductMother.create({
      name: mockProduct.toPrimitives().name,
      price: mockProduct.toPrimitives().price,
      quantity: saleRequest.products[0].quantity,
      productId: mockProduct.toPrimitives().id,
    });
    saleProductRepository.saveMany.mockResolvedValue([mockSaleProduct]);

    const mockSale = SaleMother.create({
      id: saleRequest.id,
      date: saleRequest.date,
      userId: saleRequest.userId,
      saleProducts: [mockSaleProduct.toPrimitives()],
    });
    saleRepository.save.mockResolvedValue(mockSale);

    const result = await saleCreate.run(saleRequest);

    expect(result).toEqual({
      id: saleRequest.id,
      date: saleRequest.date,
      totalAmount:
        saleRequest.products[0].quantity * mockProduct.toPrimitives().price,
      user: { id: saleRequest.userId, name: mockUser.name.value },
      saleProducts: [mockSaleProduct.toPrimitives()],
    });
    expect(userRepository.findOneById).toHaveBeenCalledWith(saleRequest.userId);
    expect(productRepository.findAllByIds).toHaveBeenCalledWith([
      saleRequest.products[0].productId,
    ]);
    expect(saleProductRepository.saveMany).toHaveBeenCalled();
    expect(saleRepository.save).toHaveBeenCalledWith(mockSale);
  });
});

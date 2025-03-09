import { Body, Controller, Post } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { SaleCreateDto } from './dto/sale-create.dto';
import { SaleCreate } from '../application/create/sale.create';
import { SaleResponse } from '../domain/interfaces/sale-response';

@Controller('sale')
export class SaleController {
  constructor(private readonly saleCreate: SaleCreate) {}

  @Post()
  async create(@Body() saleCreateDto: SaleCreateDto): Promise<SaleResponse> {
    const { date, userId, products } = saleCreateDto;
    const request = {
      id: randomUUID(),
      date: new Date(date),
      userId,
      products,
    };

    return this.saleCreate.run(request);
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { SaleCreateDto } from './dto/sale-create.dto';
import { SaleResponseDto } from './dto/sale-response.dto';
import { SaleCreate } from '../application/create/sale.create';
import { Public } from '../../auth/infrastructure/decorators/public.decorator';
import { saleResponseMapper } from './mappers/sale-response.mapper';

@Controller('sale')
export class SaleController {
  constructor(private readonly saleCreate: SaleCreate) {}

  @Post()
  @Public()
  async create(@Body() saleCreateDto: SaleCreateDto): Promise<SaleResponseDto> {
    const { userId, products } = saleCreateDto;
    const request = {
      id: randomUUID(),
      date: new Date(),
      userId,
      products,
    };

    const sale = await this.saleCreate.run(request);

    return saleResponseMapper(sale);
  }
}

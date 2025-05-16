import { Body, Controller, Post, Req } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Request } from 'express';
import { verify } from 'jsonwebtoken';
import { SaleCreateDto } from './dto/sale-create.dto';
import { SaleResponseDto } from './dto/sale-response.dto';
import { SaleCreate } from '../application/create/sale.create';
import { JwtConstants } from '../../auth/infrastructure/constants/jwt.constants';
import { Roles } from '../../auth/infrastructure/decorators/roles.decorator';
import { USER_ROLE } from '../../user/domain/enum/user.role';
import { saleResponseMapper } from './mappers/sale-response.mapper';

@Controller('sale')
export class SaleController {
  constructor(private readonly saleCreate: SaleCreate) {}

  @Post()
  @Roles(USER_ROLE.ADMIN, USER_ROLE.EMPLOYEE, USER_ROLE.CUSTOMER)
  async create(
    @Body() saleCreateDto: SaleCreateDto,
    @Req() req: Request,
  ): Promise<SaleResponseDto> {
    const decodedToken: any = verify(
      req.cookies.auth_token,
      JwtConstants.SECRET,
    );
    const { id: userId } = decodedToken;
    const { products } = saleCreateDto;
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

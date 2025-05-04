import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ProductCreateDto } from './dto/product-create.dto';
import { ProductCreate } from '../application/create/product.create';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductFindAll } from '../application/find-all/product.find-all';
import { ProductFindOneById } from '../application/find-one-by-id/product.find-one-by-id';
import { Public } from '../../auth/infrastructure/decorators/public.decorator';
import { Roles } from '../../auth/infrastructure/decorators/roles.decorator';
import { USER_ROLE } from '../../user/domain/enum/user.role';
import { ProductResponseDTO } from './dto/product-response.dto';
import { productResponseMapper } from './mappers/product-response.mapper';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productCreate: ProductCreate,
    private readonly productFindAll: ProductFindAll,
    private readonly productFindOneById: ProductFindOneById,
  ) {}

  @Public()
  @Get()
  async findAll(
    @Query('filter') filter?: string,
  ): Promise<ProductResponseDTO[]> {
    const products = await this.productFindAll.run(filter);

    return products.map((product) => productResponseMapper(product));
  }

  @Public()
  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<ProductResponseDTO> {
    const product = await this.productFindOneById.run(id);

    return productResponseMapper(product);
  }

  @Post()
  @Roles(USER_ROLE.ADMIN, USER_ROLE.EMPLOYEE)
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() productCreateDto: ProductCreateDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<ProductResponseDTO> {
    const { name, description, category, price, stock } = productCreateDto;
    const { originalname, mimetype, size, buffer: data } = image;
    const request = {
      name,
      description,
      category,
      price: Number(price),
      stock: Number(stock),
      id: randomUUID(),
      image: {
        originalname,
        mimetype,
        size,
        data,
      },
    };

    const product = await this.productCreate.run(request);

    return productResponseMapper(product);
  }
}

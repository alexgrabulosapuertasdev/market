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
import { ProductResponse } from '../domain/interface/product.response';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductFindAll } from '../application/find-all/product.find-all';
import { ProductFindOneById } from '../application/find-one-by-id/product.find-one-by-id';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productCreate: ProductCreate,
    private readonly productFindAll: ProductFindAll,
    private readonly productFindOneById: ProductFindOneById,
  ) {}

  @Get()
  findAll(@Query('filter') filter?: string): Promise<ProductResponse[]> {
    return this.productFindAll.run(filter);
  }

  @Get(':id')
  findOneById(@Param('id') id: string): Promise<ProductResponse> {
    return this.productFindOneById.run(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() productCreateDto: ProductCreateDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<ProductResponse> {
    const { name, description, category, price, stock } = productCreateDto;
    const { originalname, mimetype, size, buffer } = image;
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
        base64: buffer.toString('base64'),
      },
    };

    return this.productCreate.run(request);
  }
}

import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { randomUUID } from 'crypto';
import { ProductCreateDto } from './dto/product-create.dto';
import { ProductCreate } from '../application/create/product.create';
import { ProductResponse } from '../domain/interface/product.response';

@Controller('product')
export class ProductController {
  constructor(private readonly productCreate: ProductCreate) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() productCreateDto: ProductCreateDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<ProductResponse> {
    const { name, description, category, price, stock } = productCreateDto;
    const request = {
      name,
      description,
      category,
      price: Number(price),
      stock: Number(stock),
      id: randomUUID(),
      imageOriginalname: image.originalname,
    };

    return this.productCreate.run(request);
  }
}

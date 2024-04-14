import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ProductCreateDto } from './dto/product-create.dto';
import { ProductCreate } from '../application/create/product.create';
import { ProductResponse } from '../domain/interface/product.response';
import { FileInterceptor } from '@nestjs/platform-express';

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

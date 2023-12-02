import { Body, Controller, Get, Post } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { UserCreateDto } from './dto/user-create.dto';
import { UserFindAll } from '../application/find-all/user.find-all';
import { UserCreate } from '../application/create/user.create';
import { UserResponse } from '../domain/interface/user.response';

@Controller('user')
export class UserController {
  constructor(
    private readonly userCreate: UserCreate,
    private readonly userFindAll: UserFindAll,
  ) {}

  @Get()
  findAll(): Promise<UserResponse[]> {
    return this.userFindAll.run();
  }

  @Post()
  create(@Body() userCreateDto: UserCreateDto): Promise<UserResponse> {
    return this.userCreate.run({
      ...userCreateDto,
      id: randomUUID(),
    });
  }
}

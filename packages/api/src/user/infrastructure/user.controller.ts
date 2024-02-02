import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { UserCreateDto } from './dto/user-create.dto';
import { UserFindAll } from '../application/find-all/user.find-all';
import { UserCreate } from '../application/create/user.create';
import { UserResponse } from '../domain/interface/user.response';
import { UserDelete } from '../application/delete/user.delete';

@Controller('user')
export class UserController {
  constructor(
    private readonly userCreate: UserCreate,
    private readonly userDelete: UserDelete,
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

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.userDelete.run(id);
  }
}

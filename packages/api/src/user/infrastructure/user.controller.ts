import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { UserCreateDto } from './dto/user-create.dto';
import { UserFindAll } from '../application/find-all/user.find-all';
import { UserCreate } from '../application/create/user.create';
import { UserDelete } from '../application/delete/user.delete';
import { UserUpdateDto } from './dto/user-update.dto';
import { UserUpdate } from '../application/update/user.update';
import { USER_ROLE } from '../domain/enum/user.role';
import { Roles } from '../../auth/infrastructure/decorators/roles.decorator';
import { userResponseMapper } from './mappers/user-response.mapper';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userCreate: UserCreate,
    private readonly userDelete: UserDelete,
    private readonly userFindAll: UserFindAll,
    private readonly userUpdate: UserUpdate,
  ) {}

  @Get()
  @Roles(USER_ROLE.ADMIN)
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userFindAll.run();

    return users.map((user) => userResponseMapper(user));
  }

  @Post()
  @Roles(USER_ROLE.ADMIN)
  async create(@Body() userCreateDto: UserCreateDto): Promise<UserResponseDto> {
    const user = await this.userCreate.run({
      ...userCreateDto,
      id: randomUUID(),
    });

    return userResponseMapper(user);
  }

  @Put(':id')
  @Roles(USER_ROLE.ADMIN)
  async update(
    @Body() userUpdateDto: UserUpdateDto,
    @Param('id') id: string,
  ): Promise<UserResponseDto> {
    const user = await this.userUpdate.run({ id, ...userUpdateDto });

    return userResponseMapper(user);
  }

  @Delete(':id')
  @Roles(USER_ROLE.ADMIN)
  delete(@Param('id') id: string): Promise<void> {
    return this.userDelete.run(id);
  }
}

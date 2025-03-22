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
import { UserResponse } from '../domain/interface/user.response';
import { UserDelete } from '../application/delete/user.delete';
import { UserUpdateDto } from './dto/user-update.dto';
import { UserUpdate } from '../application/update/user.update';
import { USER_ROLE } from '../domain/enum/user.role';
import { Roles } from '../../auth/infrastructure/decorators/roles.decorator';

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
  findAll(): Promise<UserResponse[]> {
    return this.userFindAll.run();
  }

  @Post()
  @Roles(USER_ROLE.ADMIN)
  create(@Body() userCreateDto: UserCreateDto): Promise<UserResponse> {
    return this.userCreate.run({
      ...userCreateDto,
      id: randomUUID(),
    });
  }

  @Put(':id')
  @Roles(USER_ROLE.ADMIN)
  update(
    @Body() userUpdateDto: UserUpdateDto,
    @Param('id') id: string,
  ): Promise<UserResponse> {
    return this.userUpdate.run({ id, ...userUpdateDto });
  }

  @Delete(':id')
  @Roles(USER_ROLE.ADMIN)
  delete(@Param('id') id: string): Promise<void> {
    return this.userDelete.run(id);
  }
}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserCreateDto } from './dto/user-create.dto';
import { UserService } from './user.service';
import { User } from './entity/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post()
  create(@Body() userCreateDto: UserCreateDto): Promise<User> {
    return this.userService.create(userCreateDto);
  }
}

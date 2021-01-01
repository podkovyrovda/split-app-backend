import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from './user.dto';
import { User } from './user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this._usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this._usersService.findOne(id);
  }

  @Post()
  async post(@Body() userDTO: UserDTO): Promise<User> {
    return this._usersService.create(userDTO);
  }
}

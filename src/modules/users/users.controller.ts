import { Controller, Get } from '@nestjs/common';
import { UserOrmEntity } from './models/user.orm-entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}

  @Get()
  findAll(): Promise<UserOrmEntity[]> {
    return this._usersService.findAll();
  }
}

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserOrmEntity } from './models/user.orm-entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly _usersRepository: Repository<UserOrmEntity>,
  ) {}

  findAll(): Promise<UserOrmEntity[]> {
    return this._usersRepository.find();
  }
}

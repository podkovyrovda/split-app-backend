import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { User } from './user.interface';
import { UserDTO } from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _usersRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<User[]> {
    const usersEntities = await this._usersRepository.find();

    return usersEntities.map(UserDTO.fromEntity);
  }

  async findOne(id: string): Promise<User> {
    const userEntity = await this._usersRepository.findOne(id);

    return UserDTO.fromEntity(userEntity);
  }

  async create(user: UserDTO): Promise<User> {
    const userEntity = await this._usersRepository.save(UserDTO.toEntity(user));

    return UserDTO.fromEntity(userEntity);
  }
}

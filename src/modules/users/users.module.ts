import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserOrmEntity } from './models/user.orm-entity';

@Module({
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([UserOrmEntity])],
  controllers: [UsersController],
})
export class UsersModule {}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export const USER_ROLES = Object.entries(UserRole).map(([, value]) => value);

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column()
  firstName: string;

  @Column({ default: UserRole.USER })
  role: UserRole;

  @PrimaryGeneratedColumn('uuid')
  id: string;
}

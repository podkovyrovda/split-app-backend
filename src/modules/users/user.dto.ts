import { IsNotEmpty, IsString, IsIn } from 'class-validator';
import { USER_ROLES, UserEntity, UserRole } from './user.entity';
import { User } from './user.interface';

export class UserDTO {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsIn(USER_ROLES)
  role: UserRole;

  public static fromEntity(entity: UserEntity): User {
    return {
      id: entity.id,
      firstName: entity.firstName,
      role: entity.role,
    };
  }

  public static toEntity(user: UserDTO): UserEntity {
    const userEntity = new UserEntity();

    userEntity.firstName = user.firstName;
    userEntity.role = user.role;

    return userEntity;
  }
}

import { MigrationInterface, QueryRunner, Repository } from 'typeorm';
import { UserOrmEntity } from '../models/user.orm-entity';

export class CreateAdmin1608957123252 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const usersRepository: Repository<UserOrmEntity> = queryRunner.connection.getRepository(
      UserOrmEntity,
    );

    if (await usersRepository.findOne({ where: { login: 'admin' } })) {
      return;
    }

    const admin: UserOrmEntity = usersRepository.create({
      login: 'admin',
    });

    await usersRepository.insert(admin);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const usersRepository: Repository<UserOrmEntity> = queryRunner.connection.getRepository(
      UserOrmEntity,
    );

    const admin: UserOrmEntity = await usersRepository.findOne({
      where: { login: 'admin' },
    });

    if (!admin) {
      return;
    }

    await usersRepository.remove(admin);
  }
}

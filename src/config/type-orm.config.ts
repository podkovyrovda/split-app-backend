import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// TODO: как подменять опшионсы для разных окружений
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  host: 'localhost',
  port: 27017,
  database: 'routiin',
  entities: [__dirname + '/../**/*.orm-entity{.ts,.js}'],

  autoLoadEntities: true,
  synchronize: true,
};

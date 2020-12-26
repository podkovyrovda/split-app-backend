import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('users')
export class UserOrmEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  login: string;
}

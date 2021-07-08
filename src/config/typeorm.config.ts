import { TaskEntity } from '../utilities/entities/task/task.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from 'src/utilities/entities/user/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'ahmedsalih',
  database: 'nestHandsOn',
  entities: [TaskEntity, UserEntity],
  synchronize: true,
};

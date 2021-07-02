import { TaskEntity } from './../utilities/entities/task/task.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'ahmedsalih',
  database: 'nestHandsOn',
  entities: [TaskEntity],
  synchronize: true,
};

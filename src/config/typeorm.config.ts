import { TaskEntity } from '../utilities/entities/task/task.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from 'src/utilities/entities/user/user.entity';
import * as config from 'config';

// grab the configs:
const { type, host, port, username, database, synchronize } = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: process.env.DB_TYPE || type,
  host: process.env.DB_HOST || host,
  port: process.env.DB_PORT || port,
  username: process.env.DB_USERNAME || username,
  database: process.env.DB_PASSWORD || database,
  entities: [TaskEntity, UserEntity],
  synchronize: process.env.ORM_SYNCH || synchronize,
};

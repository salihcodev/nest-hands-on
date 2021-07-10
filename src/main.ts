import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config';

async function appEntryPoint() {
  // extract current port:
  const { port: _port } = config.get('server');
  const port = process.env.PORT || _port;

  // logger:
  const logger = new Logger('appEntryPoint');
  const app = await NestFactory.create(AppModule);
  await app.listen(port);

  // log wether it's running or not:
  logger.log(`App is listening on port ${port}`);
}
appEntryPoint();

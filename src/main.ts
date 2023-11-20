import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { useContainer } from 'class-validator';
import { WinstonModule } from 'nest-winston';
import { instance } from '../winston.logger';

require('dotenv').config();
require('cookie-parser');

async function bootstrap() {

  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: instance,
    }),
  });
  app.useGlobalPipes(new ValidationPipe());
  useContainer(app.select(AppModule), {fallbackOnErrors: true})
  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:8080',
    credentials: true
  })
  await app.listen(3000);

  const server = app.getHttpServer();
  const router = server._events.request._router;

  const availableRoutes: [] = router.stack
    .map(layer => {
      if (layer.route) {
        return {
          route: {
            path: layer.route?.path,
            method: layer.route?.stack[0].method,
          },
        };
      }
    })
    .filter(item => item !== undefined);
  // console.log(availableRoutes);
}
bootstrap();

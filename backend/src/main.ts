import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DevLogger } from './loggers/dev.logger';
import { JsonLogger } from './loggers/json.logger';
import { TskvLogger } from './loggers/tskv.logger';

function getLogger() {
  switch (process.env.LOG_FORMAT) {
    case 'json':
      return new JsonLogger();
    case 'tskv':
      return new TskvLogger();
    default:
      return new DevLogger();
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.setGlobalPrefix('api/afisha');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.useLogger(getLogger());
  await app.listen(3000);
}
bootstrap();

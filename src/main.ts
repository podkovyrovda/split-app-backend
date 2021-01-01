import { NestFactory } from '@nestjs/core';
import { configService } from './config/config.service';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(configService.getPort());
}

bootstrap();

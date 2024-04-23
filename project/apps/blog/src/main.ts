/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { attachSwagger } from '@project/shared/helpers';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe());

  attachSwagger({
    app,
    DocumentBuilder: new DocumentBuilder()
      .setTitle('The «Blog» service')
      .setDescription('«Blog» service API')
      .setVersion('1.0')
      .addTag('posts', 'Публикации')
      .addTag('likes', 'Лайки')
      .addTag('comments', 'Комментарии'),
    swaggerCustomOptions: {
      customSiteTitle: '[Blog] Swagger UI',
    },
  });

  const configService = app.get(ConfigService);
  const port = configService.get('application.port');

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { AuthKeyName, attachSwagger } from '@project/shared/helpers';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe());

  attachSwagger({
    app,
    DocumentBuilder: new DocumentBuilder()
      .setTitle('The «Users» service')
      .setDescription('Users service API')
      .setVersion('1.0')
      .addTag('auth', 'Авторизация и Регистрация')
      .addBearerAuth(
        {
          name: 'Authorization',
          bearerFormat: 'Bearer',
          scheme: 'Bearer',
          type: 'http',
          in: 'Header',
        },
        AuthKeyName
      ),

    swaggerCustomOptions: {
      customSiteTitle: '[Users] Swagger UI',
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

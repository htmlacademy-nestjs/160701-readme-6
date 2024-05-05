import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from '../../configurations/app.config';
import { mongoConfig } from '../../configurations/mongo/mongo.config';
import { jwtConfig } from '../../configurations/jwt/jwt.config';
import { rabbitConfig } from '../../configurations/rabbit/rabbit.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, mongoConfig, jwtConfig, rabbitConfig],
      envFilePath: 'apps/users/.env',
    }),
  ],
})
export class UsersConfigModule {}

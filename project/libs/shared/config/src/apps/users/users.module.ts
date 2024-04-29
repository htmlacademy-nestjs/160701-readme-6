import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from '../../configurations/app.config';
import { mongoConfig } from '../../configurations/mongo/mongo.config';
import { jwtConfig } from '../../configurations/jwt/jwt.config';
// import { appConfig, mongoConfig, rabbitConfig } from '@project/config-base';
// import { jwtConfig } from './jwt/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [
        appConfig,
        mongoConfig,
        jwtConfig,
        //  rabbitConfig, jwtConfig
      ],
      envFilePath: 'apps/users/.env',
    }),
  ],
})
export class UsersConfigModule {}

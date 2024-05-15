import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from '../../configurations/app.config';
import { microservicesConfig } from './microservices.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, microservicesConfig],
      envFilePath: 'apps/api/.env',
    }),
  ],
})
export class ApiConfigModule {}

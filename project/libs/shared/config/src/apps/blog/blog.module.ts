import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from '../../configurations/app.config';
import { rabbitConfig } from '../../configurations/rabbit/rabbit.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, rabbitConfig],
      envFilePath: 'apps/blog/.env',
    }),
  ],
})
export class BlogConfigModule {}

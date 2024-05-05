import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { mailConfig } from '../../configurations/mail/mail.config';
import { mongoConfig } from '../../configurations/mongo/mongo.config';
import { appConfig } from '../../configurations/app.config';
import { rabbitConfig } from '../../configurations/rabbit/rabbit.config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, rabbitConfig, mongoConfig, mailConfig],
      envFilePath: 'apps/notify/.env',
    }),
  ],
})
export class NotifyConfigModule {}

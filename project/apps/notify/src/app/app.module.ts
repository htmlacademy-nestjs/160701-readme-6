import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotifyConfigModule, getMongooseOptions } from '@project/config';
import { EmailSubscriberModule } from '@project/email-subscriber';
import { CronModule } from '@project/notify-cron';

@Module({
  imports: [
    CronModule,
    NotifyConfigModule,
    EmailSubscriberModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

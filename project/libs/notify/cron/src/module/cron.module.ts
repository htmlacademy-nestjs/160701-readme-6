import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { ScheduleModule } from '@nestjs/schedule';
import { EmailSubscriberModule } from '@project/email-subscriber';

@Module({
  imports: [ScheduleModule.forRoot(), EmailSubscriberModule],
  providers: [CronService],
})
export class CronModule {}

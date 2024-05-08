import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CronTime } from './cronTime.enum';
import { EmailSubscriberService } from '@project/email-subscriber';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(
    private readonly emailSubscriberService: EmailSubscriberService
  ) {}
  @Cron(CronTime.EVERY_DAY)
  // @Cron(CronTime.EVERY_5_SECONDS)
  public async sendNewPosts() {
    const subscribers = await this.emailSubscriberService.getAllSubscribers();

    this.logger.debug('Called every 5second');
    this.logger.log(subscribers);
  }
}

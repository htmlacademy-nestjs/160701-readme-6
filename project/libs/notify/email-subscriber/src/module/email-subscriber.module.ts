import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  EmailSubscriberModel,
  EmailSubscriberSchema,
} from './email-subscriber.model';
import { EmailSubscriberService } from './email-subscriber.service';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { EmailSubscriberFactory } from './email-subscriber.factory';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMQOptions } from '@project/config';
import { MailModule } from '@project/notify-mail';
import { EmailSubscriberController } from './email-subscriber.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EmailSubscriberModel.name, schema: EmailSubscriberSchema },
    ]),
    RabbitMQModule.forRootAsync(RabbitMQModule, getRabbitMQOptions()),
    MailModule,
  ],
  controllers: [EmailSubscriberController],
  providers: [
    EmailSubscriberService,
    EmailSubscriberRepository,
    EmailSubscriberFactory,
  ],
  exports: [EmailSubscriberService],
})
export class EmailSubscriberModule {}

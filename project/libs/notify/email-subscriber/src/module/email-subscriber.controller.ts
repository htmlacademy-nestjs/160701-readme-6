import { Controller } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

import { EmailSubscriberService } from './email-subscriber.service';
import {
  CreateSubscriberDto,
  ChangeSubscriberPasswordDto,
  RabbitRouting,
  RabbitExchange,
} from '@project/shared/core';
import { MailService } from '@project/notify-mail';

@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly subscriberService: EmailSubscriberService,
    private readonly mailService: MailService
  ) {}

  @RabbitSubscribe({
    exchange: RabbitExchange.Income,
    routingKey: RabbitRouting.AddSubscriber,
    queue: RabbitExchange.Income,
  })
  public async create(subscriber: CreateSubscriberDto) {
    this.subscriberService.addSubscriber(subscriber);
    this.mailService.sendNotifyNewSubscriber(subscriber);
  }

  @RabbitSubscribe({
    exchange: RabbitExchange.ChangePassword,
    routingKey: RabbitRouting.ChangePassword,
    queue: RabbitExchange.ChangePassword,
  })
  public async changePassword(subscriber: ChangeSubscriberPasswordDto) {
    this.mailService.sendNotifyChangePassword(subscriber);
  }
}

import { Controller } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

import { EmailSubscriberService } from './email-subscriber.service';
import {
  CreateSubscriberDto,
  ChangeSubscriberPasswordDto,
  RabbitRouting,
  RabbitExchange,
  RabbitQueue,
  Post,
  NotifyRecoveryEmailDto,
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
    queue: RabbitQueue.Income,
  })
  public async create(subscriber: CreateSubscriberDto) {
    this.subscriberService.addSubscriber(subscriber);
    this.mailService.sendNotifyNewSubscriber(subscriber);
  }

  @RabbitSubscribe({
    exchange: RabbitExchange.ChangePassword,
    routingKey: RabbitRouting.ChangePassword,
    queue: RabbitQueue.ChangePassword,
  })
  public async changePassword(subscriber: ChangeSubscriberPasswordDto) {
    this.mailService.sendNotifyChangePassword(subscriber);
  }

  @RabbitSubscribe({
    exchange: RabbitExchange.RecoveryEmail,
    routingKey: RabbitRouting.RecoveryEmail,
    queue: RabbitQueue.RecoveryEmail,
  })
  public async recoveryEmail(dto: NotifyRecoveryEmailDto) {
    this.mailService.sendRecoveryEmail(dto);
  }

  @RabbitSubscribe({
    exchange: RabbitExchange.SendNewPosts,
    routingKey: RabbitRouting.SendNewPosts,
    queue: RabbitQueue.SendNewPosts,
  })
  public async sendNewPosts(posts: Post[]) {
    const subscribers = await this.subscriberService.getAllSubscribers();
    const promises = subscribers.map((subscriber) =>
      this.mailService.sendNewPostsNotification(subscriber, posts)
    );
    await Promise.all(promises);
  }
}

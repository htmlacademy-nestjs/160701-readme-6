import { Controller } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

import { EmailSubscriberService } from './email-subscriber.service';
import {
  CreateSubscriberDto,
  RabbitRouting,
  RabbitExchange,
  RabbitQueue,
  Post,
  DeleteSubscriberDto,
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
    exchange: RabbitExchange.Income,
    routingKey: RabbitRouting.DeleteSubscriber,
    queue: RabbitQueue.Income,
  })
  public async delete({ email }: DeleteSubscriberDto) {
    this.subscriberService.deleteSubscriber(email);
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

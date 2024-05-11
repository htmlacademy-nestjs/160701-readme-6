import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Post, RabbitExchange, RabbitRouting } from '@project/shared/core';

@Injectable()
export class NotifyService {
  constructor(private readonly rabbitClient: AmqpConnection) {}

  public async sendPosts(posts: Post[]) {
    return this.rabbitClient.publish<Post[]>(
      RabbitExchange.SendNewPosts,
      RabbitRouting.SendNewPosts,
      posts
    );
  }
}

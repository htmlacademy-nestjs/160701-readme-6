import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

import { ConfigType } from '@nestjs/config';
import {
  ChangeSubscriberPasswordDto,
  CreateSubscriberDto,
  RabbitExchange,
  RabbitRouting,
} from '@project/shared/core';

@Injectable()
export class NotifyService {
  constructor(private readonly rabbitClient: AmqpConnection) {}

  public async registerSubscriber(dto: CreateSubscriberDto) {
    return this.rabbitClient.publish<CreateSubscriberDto>(
      RabbitExchange.Income,
      RabbitRouting.AddSubscriber,
      dto
    );
  }

  public async changePassword(dto: ChangeSubscriberPasswordDto) {
    return this.rabbitClient.publish<ChangeSubscriberPasswordDto>(
      RabbitExchange.ChangePassword,
      RabbitRouting.ChangePassword,
      dto
    );
  }
}

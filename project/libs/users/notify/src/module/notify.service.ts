import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

import { ConfigType } from '@nestjs/config';
import {
  ChangeSubscriberPasswordDto,
  CreateSubscriberDto,
  RabbitRouting,
} from '@project/shared/core';
import { rabbitConfig } from '@project/config';

@Injectable()
export class NotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly config: ConfigType<typeof rabbitConfig>
  ) {}

  public async registerSubscriber(dto: CreateSubscriberDto) {
    return this.rabbitClient.publish<CreateSubscriberDto>(
      this.config.exchange,
      RabbitRouting.AddSubscriber,
      dto
    );
  }

  public async changePassword(dto: ChangeSubscriberPasswordDto) {
    return this.rabbitClient.publish<ChangeSubscriberPasswordDto>(
      this.config.exchange,
      RabbitRouting.ChangePassword,
      dto
    );
  }
}

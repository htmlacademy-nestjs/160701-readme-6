import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import {
  ChangeSubscriberPasswordDto,
  CreateSubscriberDto,
  NotifyRecoveryEmailDto,
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

  public async recoveryEmail(dto: NotifyRecoveryEmailDto) {
    return this.rabbitClient.publish<NotifyRecoveryEmailDto>(
      RabbitExchange.RecoveryEmail,
      RabbitRouting.RecoveryEmail,
      dto
    );
  }
}

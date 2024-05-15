import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { RabbitExchange, RabbitRouting } from '@project/shared/core';
import {
  ChangeSubscriberPasswordDto,
  CreateSubscriberDto,
  NotifyRecoveryEmailDto,
} from '@project/dto';

@Injectable()
export class NotifyService {
  constructor(private readonly rabbitClient: AmqpConnection) {}

  public async registerSubscriber(dto: CreateSubscriberDto) {
    return this.rabbitClient.publish<CreateSubscriberDto>(
      RabbitExchange.Notify,
      RabbitRouting.AddSubscriber,
      dto
    );
  }

  public async changePassword(dto: ChangeSubscriberPasswordDto) {
    return this.rabbitClient.publish<ChangeSubscriberPasswordDto>(
      RabbitExchange.Notify,
      RabbitRouting.ChangePassword,
      dto
    );
  }

  public async recoveryEmail(dto: NotifyRecoveryEmailDto) {
    return this.rabbitClient.publish<NotifyRecoveryEmailDto>(
      RabbitExchange.Notify,
      RabbitRouting.RecoveryEmail,
      dto
    );
  }
}

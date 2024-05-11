import { Controller } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

import {
  ChangeSubscriberPasswordDto,
  RabbitRouting,
  RabbitExchange,
  RabbitQueue,
  NotifyRecoveryEmailDto,
} from '@project/shared/core';
import { MailService } from '@project/notify-mail';

@Controller()
export class UserEmailsController {
  constructor(private readonly mailService: MailService) {}

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
}

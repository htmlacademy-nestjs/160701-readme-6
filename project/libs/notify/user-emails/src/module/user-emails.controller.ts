import { Controller } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

import {
  RabbitRouting,
  RabbitExchange,
  RabbitQueue,
} from '@project/shared/core';
import { MailService } from '@project/notify-mail';
import {
  ChangeSubscriberPasswordDto,
  NotifyRecoveryEmailDto,
} from '@project/dto';

@Controller()
export class UserEmailsController {
  constructor(private readonly mailService: MailService) {}

  @RabbitSubscribe({
    exchange: RabbitExchange.Notify,
    routingKey: RabbitRouting.ChangePassword,
    queue: RabbitQueue.ChangePassword,
  })
  public async changePassword(subscriber: ChangeSubscriberPasswordDto) {
    this.mailService.sendNotifyChangePassword(subscriber);
  }

  @RabbitSubscribe({
    exchange: RabbitExchange.Notify,
    routingKey: RabbitRouting.RecoveryEmail,
    queue: RabbitQueue.RecoveryEmail,
  })
  public async recoveryEmail(dto: NotifyRecoveryEmailDto) {
    this.mailService.sendRecoveryEmail(dto);
  }
}

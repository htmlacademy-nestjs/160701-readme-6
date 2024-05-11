import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMQOptions } from '@project/config';
import { MailModule } from '@project/notify-mail';
import { UserEmailsController } from './user-emails.controller';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, getRabbitMQOptions()),
    MailModule,
  ],
  controllers: [UserEmailsController],
  providers: [],
  exports: [],
})
export class UserEmailsModule {}

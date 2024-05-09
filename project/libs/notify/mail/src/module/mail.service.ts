import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { EMAIL_SUBJECT } from './mail.constant';
import { NotifyRecoveryEmailDto, Post, Subscriber } from '@project/shared/core';
import { MailConfig } from '@project/config';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    @Inject(MailConfig.KEY)
    private readonly notifyConfig: ConfigType<typeof MailConfig>
  ) {}

  public async sendNotifyNewSubscriber(subscriber: Subscriber) {
    await this.mailerService.sendMail({
      from: this.notifyConfig.from,
      to: subscriber.email,
      subject: EMAIL_SUBJECT.AddSubscriber,
      template: './add-subscriber',
      context: {
        user: `${subscriber.firstname}`,
        email: `${subscriber.email}`,
      },
    });
  }

  public async sendNotifyChangePassword(subscriber: Subscriber) {
    await this.mailerService.sendMail({
      from: this.notifyConfig.from,
      to: subscriber.email,
      subject: EMAIL_SUBJECT.ChangePassword,
      template: './change-password',
      context: {
        user: `${subscriber.firstname}`,
      },
    });
  }

  public async sendRecoveryEmail(dto: NotifyRecoveryEmailDto) {
    await this.mailerService.sendMail({
      from: this.notifyConfig.from,
      to: dto.email,
      subject: EMAIL_SUBJECT.ChangePassword,
      template: './recovery-email',
      context: {
        recoveryToken: dto.recoveryToken,
      },
    });
  }

  public async sendNewPostsNotification(subscriber: Subscriber, posts: Post[]) {
    await this.mailerService.sendMail({
      from: this.notifyConfig.from,
      to: subscriber.email,
      subject: EMAIL_SUBJECT.NewPosts,
      template: './new-posts',
      context: {
        username: subscriber.firstname,
        posts: posts,
      },
    });
  }
}

import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { getMailerAsyncOptions } from '@project/config';
import { MailService } from './mail.service';

@Module({
  imports: [MailerModule.forRootAsync(getMailerAsyncOptions())],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}

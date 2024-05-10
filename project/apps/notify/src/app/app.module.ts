import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotifyConfigModule, getMongooseOptions } from '@project/config';
import { EmailSubscriberModule } from '@project/email-subscriber';
import { UserEmailsModule } from '@project/user-emails';

@Module({
  imports: [
    NotifyConfigModule,
    EmailSubscriberModule,
    UserEmailsModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

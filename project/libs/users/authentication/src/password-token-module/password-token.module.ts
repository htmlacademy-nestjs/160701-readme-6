import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  PasswordTokenModel,
  PasswordTokenSchema,
} from './password-token.model';
import { PasswordTokenService } from './password-token.service';
import { PasswordTokenRepository } from './password-token.repository';
import { PasswordTokenFactory } from './password-token.factory';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PasswordTokenModel.name, schema: PasswordTokenSchema },
    ]),
  ],
  providers: [
    PasswordTokenService,
    PasswordTokenRepository,
    PasswordTokenFactory,
  ],
  exports: [PasswordTokenService],
})
export class PasswordTokenModule {}

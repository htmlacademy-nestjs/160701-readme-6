import { Injectable } from '@nestjs/common';
import { PasswordToken, EntityFactory } from '@project/shared/core';
import { PasswordTokenEntity } from './password-token.entity';

@Injectable()
export class PasswordTokenFactory
  implements EntityFactory<PasswordTokenEntity>
{
  public create(entityPlainData: PasswordToken): PasswordTokenEntity {
    return new PasswordTokenEntity(entityPlainData);
  }
}

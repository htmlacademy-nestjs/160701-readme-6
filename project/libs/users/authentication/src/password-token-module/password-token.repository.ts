import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseMongoRepository } from '@project/data-access';

import { PasswordTokenEntity } from './password-token.entity';
import { PasswordTokenModel } from './password-token.model';
import { PasswordTokenFactory } from './password-token.factory';

@Injectable()
export class PasswordTokenRepository extends BaseMongoRepository<
  PasswordTokenEntity,
  PasswordTokenModel
> {
  constructor(
    entityFactory: PasswordTokenFactory,
    @InjectModel(PasswordTokenModel.name)
    passwordTokenModel: Model<PasswordTokenModel>
  ) {
    super(entityFactory, passwordTokenModel);
  }

  public async deleteByTokenId(tokenId: string) {
    return this.model.deleteOne({ tokenId }).exec();
  }

  public async findByTokenId(
    tokenId: string
  ): Promise<PasswordTokenEntity | null> {
    const passwordTokenDocument = await this.model.findOne({ tokenId }).exec();
    if (!passwordTokenDocument) return null;

    return this.createEntityFromDocument(passwordTokenDocument);
  }

  public async deleteByEmail(userEmail: string) {
    return this.model.deleteMany({ userEmail }).exec();
  }
}

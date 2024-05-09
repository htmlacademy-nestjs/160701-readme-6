import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PasswordToken } from '@project/shared/core';

@Schema({
  collection: 'password-token-sessions',
  timestamps: true,
})
export class PasswordTokenModel extends Document implements PasswordToken {
  @Prop()
  public createdAt!: Date;

  @Prop({ required: true })
  public tokenId!: string;

  @Prop({ required: true })
  public userEmail!: string;

  @Prop({ required: true })
  public expiresIn!: Date;
}

export const PasswordTokenSchema =
  SchemaFactory.createForClass(PasswordTokenModel);

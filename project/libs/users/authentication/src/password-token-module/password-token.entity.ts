import { Entity, PasswordToken, StorableEntity } from '@project/shared/core';

export class PasswordTokenEntity
  extends Entity
  implements StorableEntity<PasswordToken>
{
  public tokenId!: string;
  public createdAt?: Date;
  public userEmail!: string;
  public expiresIn?: Date;

  constructor(token?: PasswordToken) {
    super();
    this.populate(token);
  }

  public populate(token?: PasswordToken): void {
    if (!token) {
      return;
    }

    this.id = token.id;
    this.createdAt = token.createdAt;
    this.expiresIn = token.expiresIn;
    this.userEmail = token.userEmail;
    this.tokenId = token.tokenId;
  }

  public toPOJO(): PasswordToken {
    return {
      id: this.id,
      createdAt: this.createdAt,
      expiresIn: this.expiresIn,
      userEmail: this.userEmail,
      tokenId: this.tokenId,
    };
  }
}

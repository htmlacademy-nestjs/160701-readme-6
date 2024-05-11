import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import dayjs from 'dayjs';
import { passwordTokenConfig } from '@project/config';
import { PasswordToken } from '@project/shared/core';
import { parseTime } from '@project/shared/helpers';

import { PasswordTokenRepository } from './password-token.repository';
import { PasswordTokenEntity } from './password-token.entity';

@Injectable()
export class PasswordTokenService {
  constructor(
    private readonly passwordTokenRepository: PasswordTokenRepository,
    @Inject(passwordTokenConfig.KEY)
    private readonly passwordTokenOptions: ConfigType<
      typeof passwordTokenConfig
    >
  ) {}

  public async createPasswordSession(payload: PasswordToken) {
    const timeValue = parseTime(
      this.passwordTokenOptions.passwordTokenExpiresIn
    );
    const token = new PasswordTokenEntity({
      tokenId: payload.tokenId,
      userEmail: payload.userEmail,
      expiresIn: dayjs().add(timeValue.value, timeValue.unit).toDate(),
    });

    return this.passwordTokenRepository.save(token);
  }

  public async deletePasswordSession(tokenId: string): Promise<void> {
    await this.passwordTokenRepository.deleteByTokenId(tokenId);
  }

  public async isExists(tokenId: string): Promise<boolean> {
    const token = await this.passwordTokenRepository.findByTokenId(tokenId);

    return token !== null;
  }

  public async deletePasswordTokensByEmail(email: string) {
    return this.passwordTokenRepository.deleteByEmail(email);
  }
}

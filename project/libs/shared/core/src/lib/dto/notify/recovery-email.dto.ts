import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { EMAIL_NOT_VALID } from './create-subscriber.const';

export class NotifyRecoveryEmailDto {
  @ApiProperty({
    description: 'User email',
    example: 'user@user.ru',
  })
  @IsEmail({}, { message: EMAIL_NOT_VALID })
  public email!: string;

  @ApiProperty({
    description: 'Recovery token',
    example: '65ae5755dde1bee5f9fc7d22',
  })
  public recoveryToken!: string;
}

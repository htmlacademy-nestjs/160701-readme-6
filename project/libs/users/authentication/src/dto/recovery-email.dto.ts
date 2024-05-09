import { ApiProperty } from '@nestjs/swagger';
import { AUTH_USER_EMAIL_NOT_VALID } from '../authentication-module/authentication.constant';
import { IsEmail } from 'class-validator';

export class RecoveryEmailDto {
  @ApiProperty({
    description: 'User email',
    example: 'user@user.ru',
  })
  @IsEmail({}, { message: AUTH_USER_EMAIL_NOT_VALID })
  public email!: string;
}

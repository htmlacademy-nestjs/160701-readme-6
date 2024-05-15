import { IsEmail } from 'class-validator';
import { EMAIL_NOT_VALID } from './create-subscriber.const';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteSubscriberDto {
  @ApiProperty({
    description: 'User email',
    example: 'keks@academy.com',
  })
  @IsEmail({}, { message: EMAIL_NOT_VALID })
  public email!: string;
}

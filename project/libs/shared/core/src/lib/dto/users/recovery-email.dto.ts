import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class RecoveryEmailDto {
  @ApiProperty({
    description: 'User email',
    example: 'user@user.ru',
  })
  @IsEmail()
  public email!: string;
}

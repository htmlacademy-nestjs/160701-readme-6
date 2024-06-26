import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MaxLength, MinLength } from 'class-validator';
import { User } from '@project/validation';

export class LoginUserDto {
  @ApiProperty({
    description: 'User email',
    example: 'user@user.ru',
  })
  @IsEmail()
  public email!: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
    minLength: User.password.Min,
    maxLength: User.password.Max,
  })
  @MinLength(User.password.Min)
  @MaxLength(User.password.Max)
  public password!: string;
}

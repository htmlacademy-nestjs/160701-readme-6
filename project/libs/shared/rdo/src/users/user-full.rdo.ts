import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { UserRdo } from './user.rdo';

export class UserFullRdo extends UserRdo {
  @Expose()
  @ApiProperty({
    description: 'User avatar path',
    example: '/images/user.png',
  })
  @Transform(({ value }) => (value === undefined ? null : value))
  public avatar!: string | null;
}

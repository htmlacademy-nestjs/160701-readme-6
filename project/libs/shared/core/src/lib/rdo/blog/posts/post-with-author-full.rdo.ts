import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { PostRdo } from './post.rdo';
import { UserFullRdo } from '../../users/user-full.rdo';

export class PostWithAuthorFullRdo extends PostRdo {
  @Expose()
  @ApiProperty({
    type: UserFullRdo,
    description: 'Full author info',
  })
  public author!: UserFullRdo;
}

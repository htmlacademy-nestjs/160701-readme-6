import { ApiProperty } from '@nestjs/swagger';
import { PostRdo } from './post.rdo';
import { Expose } from 'class-transformer';

export class PostWithAuthorIdRdo extends PostRdo {
  @Expose()
  @ApiProperty({
    description: 'The uniq author(user) ID',
    example: '65b7a93fe29bcc5e9410a607',
  })
  public authorId!: string;
}

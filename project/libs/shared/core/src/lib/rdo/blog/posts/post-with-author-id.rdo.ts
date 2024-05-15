import { ApiProperty } from '@nestjs/swagger';
import { PostRdo as BasePost } from './post.rdo';
import { Expose } from 'class-transformer';

export class PostWithAuthorIdRdo extends BasePost {
  @Expose()
  @ApiProperty({
    description: 'The uniq author(user) ID',
    example: '65b7a93fe29bcc5e9410a607',
  })
  public author!: string;
}

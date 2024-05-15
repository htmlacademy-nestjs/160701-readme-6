import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { PostType } from '../../../enums';

export class PostTypesRdo {
  @Expose()
  @ApiProperty({
    enum: PostType,
    description: 'Post content type',
    example: Array.from(Object.values(PostType)),
  })
  public data!: PostType;
}

import { ApiProperty } from '@nestjs/swagger';
import { PostType } from '@project/shared/core';
import { Expose } from 'class-transformer';

export class PostTypesRdo {
  @Expose()
  @ApiProperty({
    enum: PostType,
    description: 'Post content type',
    example: Array.from(Object.values(PostType)),
  })
  public data!: PostType;
}

import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';
import { RefOptionalPostContentArray } from './content';
import { PostContent } from '@project/shared/core';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @ApiProperty({
    description: 'Post content by type',
    oneOf: RefOptionalPostContentArray,
  })
  public content!: PostContent;
}

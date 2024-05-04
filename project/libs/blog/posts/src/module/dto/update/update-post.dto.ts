import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  CreatePostDto,
  PostContent,
  RefOptionalPostContentArray,
} from '@project/shared/core';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @ApiProperty({
    description: 'Post content by type',
    oneOf: RefOptionalPostContentArray,
  })
  public content!: PostContent;
}

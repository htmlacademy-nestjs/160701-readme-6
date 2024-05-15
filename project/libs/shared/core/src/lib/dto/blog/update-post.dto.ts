import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';
import { PostContent, RefOptionalPostContentArray } from './content';


export class UpdatePostDto extends PartialType(CreatePostDto) {
  @ApiProperty({
    description: 'Post content by type',
    oneOf: RefOptionalPostContentArray,
  })
  public content!: PostContent;
}

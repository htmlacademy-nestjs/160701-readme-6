import { PartialType, getSchemaPath } from '@nestjs/swagger';

import { VideoPostContentDto } from './video-post-content.dto';
import { PhotoPostContentDto } from './photo-post-content.dto';
import { QuotePostContentDto } from './quote-post-content.dto';
import { TextPostContentDto } from './text-post-content.dto';
import { LinkPostContentDto } from './link-post-content.dto';
import { PostType } from '../../../types/blog/posts/post-type.enum';


export const AllPostContentArray = [
  VideoPostContentDto,
  PhotoPostContentDto,
  QuotePostContentDto,
  TextPostContentDto,
  LinkPostContentDto,
];

export type PostContent =
  | VideoPostContentDto
  | LinkPostContentDto
  | PhotoPostContentDto
  | QuotePostContentDto
  | TextPostContentDto;

export const RefPostContentArray = AllPostContentArray.map((PostTypeClass) => ({
  $ref: getSchemaPath(PostTypeClass),
}));

export const AllOptionPostContentArray = [
  class LinkPostContentOptional extends PartialType(LinkPostContentDto) {},
  class PhotoPostContentOptional extends PartialType(PhotoPostContentDto) {},
  class VideoPostContentOptional extends PartialType(VideoPostContentDto) {},
  class TextPostContentOptional extends PartialType(TextPostContentDto) {},
  class QuotePostContentOptional extends PartialType(QuotePostContentDto) {},
];

export const RefOptionalPostContentArray = AllOptionPostContentArray.map(
  (PostTypeClass) => ({
    $ref: getSchemaPath(PostTypeClass),
  })
);

export const PostTypeContent = {
  [PostType.VIDEO]: VideoPostContentDto,
  [PostType.TEXT]: TextPostContentDto,
  [PostType.QUOTE]: QuotePostContentDto,
  [PostType.LINK]: LinkPostContentDto,
  [PostType.PHOTO]: PhotoPostContentDto,
};

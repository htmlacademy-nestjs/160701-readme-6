import { PartialType, getSchemaPath } from '@nestjs/swagger';

import { VideoPostContentDto } from './video-post-content.dto';
import { PhotoPostContentDto } from './photo-post-content.dto';
import { QuotePostContentDto } from './quote-post-content.dto';
import { TextPostContentDto } from './text-post-content.dto';
import { LinkPostContentDto } from './link-post-content.dto';

import { VideoPostContent } from '../../../interfaces/blog/posts/content/video-post-content.interface';
import { LinkPostContent } from '../../../interfaces/blog/posts/content/link-post-content.interface';
import { PhotoPostContent } from '../../../interfaces/blog/posts/content/photo-post-content.interface';
import { QuotePostContent } from '../../../interfaces/blog/posts/content/quote-post-content.interface';
import { TextPostContent } from '../../../interfaces/blog/posts/content/text-post-content.interface';
import { PostType } from '../../../enums';

export const AllPostContentArray = [
  VideoPostContentDto,
  PhotoPostContentDto,
  QuotePostContentDto,
  TextPostContentDto,
  LinkPostContentDto,
];

export type PostContent =
  | VideoPostContent
  | LinkPostContent
  | PhotoPostContent
  | QuotePostContent
  | TextPostContent;

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
  [PostType.Video]: VideoPostContentDto,
  [PostType.Text]: TextPostContentDto,
  [PostType.Quote]: QuotePostContentDto,
  [PostType.Link]: LinkPostContentDto,
  [PostType.Photo]: PhotoPostContentDto,
};

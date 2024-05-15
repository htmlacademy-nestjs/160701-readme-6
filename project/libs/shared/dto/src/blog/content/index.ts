import { PartialType, getSchemaPath } from '@nestjs/swagger';

import { VideoPostContentDto } from './video-post-content.dto';
import { PhotoPostContentDto } from './photo-post-content.dto';
import { QuotePostContentDto } from './quote-post-content.dto';
import { TextPostContentDto } from './text-post-content.dto';
import { LinkPostContentDto } from './link-post-content.dto';

import { PostType } from '@project/shared/core';

export const AllPostContentArray = [
  VideoPostContentDto,
  PhotoPostContentDto,
  QuotePostContentDto,
  TextPostContentDto,
  LinkPostContentDto,
];

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

import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import {
  AllOptionPostContentArray,
  Like,
  Post,
  PostContent,
  PostStatus,
  PostType,
  RefPostContentArray,
} from '@project/shared/core';
import { Expose, Type } from 'class-transformer';
import { Tag } from '../../types/blog/tag.interface';
import { LikeRdo } from 'libs/blog/likes/src/module/rdo/like.rdo';
import { Comment } from '../../types/blog/comment.interface';
import { CommentRdo } from 'libs/blog/comments/src/module/rdo/comment.rdo';

@ApiExtraModels(...AllOptionPostContentArray)
export class PostRdo implements Omit<Post, 'authorId' | 'contentId'> {
  @Expose()
  @ApiProperty({
    description: 'The uniq post ID',
    example: 'df191215-1f3c-407d-96b2-390bdfae1961',
  })
  public id!: string;

  @Expose()
  @ApiProperty({
    enum: PostType,
    description: 'Post content type',
    example: PostType.Video,
  })
  public type!: PostType;

  @Expose()
  @ApiProperty({
    description: 'Create post date',
    example: '2024-01-11T14:19:59.298Z',
  })
  public createdAt!: Date;

  @Expose()
  @ApiProperty({
    description: 'Posted post date',
    example: '2024-01-11T14:19:59.298Z',
  })
  public updatedAt!: Date;

  @Expose()
  @ApiProperty({
    description: 'This post is repost',
    example: 'false',
  })
  public repost!: boolean;

  @Expose()
  @ApiProperty({
    enum: PostStatus,
    description: 'This post is repost',
    example: PostStatus.Public,
    default: PostStatus.Public,
  })
  public status!: PostStatus;

  @Expose()
  @ApiProperty({
    description: 'This post tags',
    example: ['#hash'],
  })
  public tags!: Tag[];

  @Expose()
  @ApiProperty({
    description: 'Post content by type',
    oneOf: RefPostContentArray,
  })
  public content!: PostContent;

  @Expose()
  @ApiProperty({
    description: 'Post title',
    example: 'Lorem ipsum',
  })
  public title!: string;

  @Expose()
  @ApiProperty({
    description: 'Post likes',
    type: LikeRdo,
  })
  @Type(() => LikeRdo)
  public likes!: Like[];

  @Expose()
  @ApiProperty({
    description: 'Post comments',
    type: CommentRdo,
  })
  public comments!: Comment[];
}

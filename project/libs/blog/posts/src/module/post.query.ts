import { PostType, SortDirection } from '@project/shared/core';
import {
  DEFAULT_PAGE_COUNT,
  DEFAULT_POST_COUNT_LIMIT,
  DEFAULT_POST_MAX_COUNT_LIMIT,
  DEFAULT_SORT_DIRECTION,
} from './post.contant';
import { IsEnum, IsIn, IsNumber, IsOptional, Max } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PostQuery {
  @ApiProperty({
    description: 'The maximum number of posts to return',
    default: DEFAULT_POST_COUNT_LIMIT,
    type: Number,
  })
  @Transform(({ value }) => +value || DEFAULT_POST_COUNT_LIMIT)
  @IsNumber()
  @Max(DEFAULT_POST_MAX_COUNT_LIMIT)
  @IsOptional()
  public limit = DEFAULT_POST_COUNT_LIMIT;

  @ApiProperty({
    description: 'The direction in which to sort the posts',
    enum: SortDirection,
    default: DEFAULT_SORT_DIRECTION,
  })
  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection: SortDirection = DEFAULT_SORT_DIRECTION;

  @ApiProperty({
    description: 'The page number',
    default: DEFAULT_PAGE_COUNT,
    type: Number,
  })
  @Transform(({ value }) => +value || DEFAULT_PAGE_COUNT)
  @IsOptional()
  public page: number = DEFAULT_PAGE_COUNT;

  @ApiProperty({
    description: 'The type of post',
    enum: PostType,
    required: false,
  })
  @IsEnum(PostType)
  @IsOptional()
  public type?: PostType;
}

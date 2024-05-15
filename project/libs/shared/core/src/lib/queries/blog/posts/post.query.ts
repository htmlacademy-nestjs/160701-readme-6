import {
  DEFAULT_PAGE_COUNT,
  DefaultPost,
  DefaultSort,
} from '../../../const/post.const';
import { IsEnum, IsIn, IsNumber, IsOptional, Max } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { SortDirection, SortBy } from '../../../interfaces';
import { PostType } from '../../../enums';

export class PostQuery {
  @ApiProperty({
    description: 'The maximum number of posts to return',
    default: DefaultPost.COUNT_LIMIT,
    type: Number,
  })
  @Transform(({ value }) => Number(value) || DefaultPost.COUNT_LIMIT)
  @IsNumber()
  @Max(DefaultPost.MAX_COUNT_LIMIT)
  @IsOptional()
  public limit = DefaultPost.COUNT_LIMIT;

  @ApiProperty({
    description: 'The direction in which to sort the posts',
    enum: SortDirection,
    default: DefaultSort.DIRECTION,
  })
  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection: SortDirection = DefaultSort.DIRECTION;

  @ApiProperty({
    description: 'The sort type the posts',
    default: DefaultSort.BY,
    enum: SortBy,
  })
  @IsIn(Object.values(SortBy))
  @IsOptional()
  public sortBy: SortBy = DefaultSort.BY;

  @ApiProperty({
    description: 'The page number',
    default: DEFAULT_PAGE_COUNT,
    type: Number,
  })
  @Transform(({ value }) => Number(value) || DEFAULT_PAGE_COUNT)
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

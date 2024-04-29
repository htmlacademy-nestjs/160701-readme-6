import { PostType, SortDirection } from '@project/shared/core';
import {
  DEFAULT_PAGE_COUNT,
  DEFAULT_POST_COUNT_LIMIT,
  DEFAULT_POST_MAX_COUNT_LIMIT,
  DEFAULT_SORT_DIRECTION,
} from './post.contant';
import { IsEnum, IsIn, IsNumber, IsOptional, Max } from 'class-validator';
import { Transform } from 'class-transformer';

export class PostQuery {
  @Transform(({ value }) => +value || DEFAULT_POST_COUNT_LIMIT)
  @IsNumber()
  @Max(DEFAULT_POST_MAX_COUNT_LIMIT)
  @IsOptional()
  public limit = DEFAULT_POST_COUNT_LIMIT;

  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection: SortDirection = DEFAULT_SORT_DIRECTION;

  @Transform(({ value }) => +value || DEFAULT_PAGE_COUNT)
  @IsOptional()
  public page: number = DEFAULT_PAGE_COUNT;

  @IsEnum(PostType)
  @IsOptional()
  public type?: PostType;
}

import { PostRdo } from './post.rdo';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationResult } from '../../../../core/src/lib/interfaces';

export class PostWithPaginationRdo<T> implements PaginationResult<T> {
  @Expose()
  @ApiProperty({
    description: 'Posts',
    example: PostRdo,
  })
  public entities!: T[];

  @Expose()
  @ApiProperty({
    description: 'Total post per page',
    example: 10,
  })
  public totalPages!: number;

  @Expose()
  @ApiProperty({
    description: 'Total post count',
    example: 100,
  })
  public totalItems!: number;

  @Expose()
  @ApiProperty({
    description: 'Current page',
    example: 1,
  })
  public currentPage!: number;

  @Expose()
  @ApiProperty({
    description: 'Item limit per page',
    example: 20,
  })
  public itemsPerPage!: number;
}

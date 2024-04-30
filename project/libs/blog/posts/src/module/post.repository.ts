import { Injectable, NotFoundException } from '@nestjs/common';
import { BasePostgresRepository } from '@project/data-access';
import { PostEntity } from './post.entity';
import { PaginationResult, Post } from '@project/shared/core';
import { PrismaClientService } from '@project/blog-models';
import { PostFactory } from './post.factory';
import { Prisma } from '@prisma/client';
import { PostQuery } from './post.query';
import { DEFAULT_POST_COUNT_LIMIT } from './post.contant';

@Injectable()
export class PostRepository extends BasePostgresRepository<PostEntity, Post> {
  constructor(
    entityFactory: PostFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  public async save(entity: PostEntity): Promise<PostEntity> {
    const pojoEntity = entity.toPOJO();
    const record = await this.client.post.create({
      data: {
        ...pojoEntity,
        tags: {
          connect: pojoEntity.tags?.map(({ id }) => ({ id })),
        },
        comments: {
          connect: [],
        },
        likes: {
          connect: [],
        },
      },
    });

    return this.createEntityFromDocument(record as unknown as Post);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.post.delete({
      where: {
        id,
      },
    });
  }

  public async findById(id: string): Promise<PostEntity> {
    const document = await this.client.post.findFirst({
      where: {
        id,
      },
      include: {
        tags: true,
        comments: true,
        likes: true,
      },
    });

    if (!document) {
      throw new NotFoundException(`Post with id ${id} not found.`);
    }

    return this.createEntityFromDocument(document as unknown as Post);
  }

  public async update(entity: PostEntity): Promise<PostEntity> {
    const pojoEntity = entity.toPOJO();

    const record = await this.client.post.update({
      where: { id: entity.id },
      data: {
        title: pojoEntity.title,
        tags: {
          set: pojoEntity.tags?.map((tag) => ({ id: tag.id })),
        },
      },
      include: {
        likes: true,
        comments: true,
        tags: true,
      },
    });

    return this.createEntityFromDocument(record as unknown as Post);
  }

  private async getPostCount(where: Prisma.PostWhereInput): Promise<number> {
    return this.client.post.count({ where });
  }

  private calculatePostsPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

  public async find(query?: PostQuery): Promise<PaginationResult<PostEntity>> {
    const skip =
      query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit || DEFAULT_POST_COUNT_LIMIT;
    const currentPage = Number(query?.page);
    const where: Prisma.PostWhereInput = {};
    const orderBy: Prisma.PostOrderByWithRelationInput = {};

    if (query?.sortDirection && query?.sortBy) {
      if (query.sortBy === 'likes' || query.sortBy === 'comments') {
        orderBy[query?.sortBy] = { _count: query.sortDirection };
      } else {
        orderBy[query?.sortBy] = query.sortDirection;
      }
    }

    if (query?.type) {
      where.type = {
        equals: query?.type,
      };
    }

    const [records, postCount] = await Promise.all([
      this.client.post.findMany({
        where,
        orderBy,
        skip,
        take,
        include: {
          comments: true,
          likes: true,
          tags: true,
        },
      }),
      this.getPostCount(where),
    ]);

    return {
      entities: records.map((record) =>
        this.createEntityFromDocument(record as unknown as Post)
      ),
      currentPage,
      totalPages: this.calculatePostsPage(postCount, take),
      itemsPerPage: take,
      totalItems: postCount,
    };
  }
}

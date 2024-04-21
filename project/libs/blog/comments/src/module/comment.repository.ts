import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaClientService } from '@project/blog-models';
import { Comment } from '@project/shared/core';
import { BasePostgresRepository } from '@project/data-access';

import { CommentEntity } from './entities/comment.entity';
import { CommentFactory } from './comment.factory';
import { CommentFilter, commentFilterToPrismaFilter } from './comment.filter';
import { MAX_COMMENT_LIMIT } from './comment.constant';

@Injectable()
export class CommentRepository extends BasePostgresRepository<
  CommentEntity,
  Comment
> {
  constructor(
    entityFactory: CommentFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  public async save(entity: CommentEntity): Promise<CommentEntity> {
    const record = await this.client.comment.create({
      data: { ...entity.toPOJO(), id: undefined },
    });

    return this.createEntityFromDocument(record);
  }

  public async findById(id: string): Promise<CommentEntity> {
    const document = await this.client.comment.findFirst({
      where: {
        id,
      },
    });

    if (!document) {
      throw new NotFoundException(`Comment with id ${id} not found.`);
    }

    return this.createEntityFromDocument(document);
  }

  public async find(filter?: CommentFilter): Promise<CommentEntity[]> {
    const where = filter ? commentFilterToPrismaFilter(filter) : undefined;

    const documents = await this.client.comment.findMany({
      where,
      take: MAX_COMMENT_LIMIT,
    });

    return documents.map((document) => this.createEntityFromDocument(document));
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.comment.delete({
      where: {
        id,
      },
    });
  }

  public async update(entity: CommentEntity): Promise<CommentEntity> {
    const record = await this.client.comment.update({
      where: { id: entity.id },
      data: {
        message: entity.message,
      },
    });

    return this.createEntityFromDocument(record);
  }

  public async findByIds(ids: string[]): Promise<CommentEntity[]> {
    const records = await this.client.comment.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return records.map((record) => this.createEntityFromDocument(record));
  }
}

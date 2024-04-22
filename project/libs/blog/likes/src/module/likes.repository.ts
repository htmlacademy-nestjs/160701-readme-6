import { BasePostgresRepository } from '@project/data-access';
import { LikeEntity } from './entities/like.entity';
import { LikeFactory } from './likes.factory';
import { PrismaClientService } from '@project/blog-models';
import { Like } from '@project/shared/core';
import { NotFoundException } from '@nestjs/common';

export class LikesRepository extends BasePostgresRepository<LikeEntity, Like> {
  constructor(
    entityFactory: LikeFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }
  public async getAll() {
    const documents = await this.client.like.findMany();

    return documents.map((document) => this.createEntityFromDocument(document));
  }

  public async getAllByPostId(postId: string) {
    const documents = await this.client.like.findMany({ where: { postId } });

    return documents.map((document) => this.createEntityFromDocument(document));
  }

  public async findByPostAndUserId({
    postId,
    userId,
  }: {
    postId: string;
    userId: string;
  }) {
    const document = await this.client.like.findFirst({
      where: { postId, userId },
    });

    if (!document) {
      throw new NotFoundException(
        `Like userId: ${userId} for postId:${postId} not found.`
      );
    }

    return this.createEntityFromDocument(document);
  }
}

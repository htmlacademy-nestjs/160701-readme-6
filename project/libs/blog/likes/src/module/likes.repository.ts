import { BasePostgresRepository } from '@project/data-access';
import { LikeEntity } from './entities/like.entity';
import { LikeFactory } from './likes.factory';
import { PrismaClientService } from '@project/blog-models';
import { Like } from '@project/shared/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LikesRepository extends BasePostgresRepository<LikeEntity, Like> {
  constructor(
    entityFactory: LikeFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  public async save(entity: LikeEntity): Promise<LikeEntity> {
    const record = await this.client.like.create({
      data: { ...entity.toPOJO() },
    });

    return this.createEntityFromDocument(record);
  }

  public async deleteById(id: string): Promise<void> {
    const document = await this.client.like.delete({
      where: {
        id,
      },
    });
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
      return null;
    }

    return this.createEntityFromDocument(document);
  }
}

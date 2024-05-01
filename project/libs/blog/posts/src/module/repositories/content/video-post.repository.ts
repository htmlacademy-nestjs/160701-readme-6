import { Injectable } from '@nestjs/common';
import { VideoPostContent } from '@project/shared/core';
import { BasePostgresRepository } from '@project/data-access';
import {
  UnionAllContentEntity,
  VideoPostContentEntity,
} from '../../entitites/content';
import { PostContentEntityFactory } from '../../post-content/post-content-entity.factory';
import { PrismaClientService } from '@project/blog-models';

@Injectable()
export class VideoPostRepository extends BasePostgresRepository<
  UnionAllContentEntity,
  VideoPostContent
> {
  constructor(
    entityFactory: PostContentEntityFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  public async save(entity: VideoPostContentEntity) {
    const pojoEntity = entity.toPOJO();

    const record = await this.client.postVideo.create({
      data: { ...pojoEntity },
    });

    return new VideoPostContentEntity(record);
  }
}

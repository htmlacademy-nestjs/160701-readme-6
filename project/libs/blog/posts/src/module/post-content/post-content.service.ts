import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
// import { PostContent, PostType } from '@project/libs/shared/app/types';
import { PostContentEntityFactory } from './post-content-entity.factory';
import { PostContentRepositoryFactory } from './post-content-repository.factory';
import { Repository } from '@project/data-access';
import { PostContent, PostType } from '@project/shared/core';
import { BasePostContentEntity } from '../entitites/content';
// import { BasePostContentEntity } from '../entities/content';
// import { Repository } from '@project/shared/core';

@Injectable()
export class PostContentService {
  private readonly repositories: Map<
    PostType,
    Repository<BasePostContentEntity>
  > = new Map();

  constructor(
    private readonly postContentRepositoryFactory: PostContentRepositoryFactory,
    private readonly postContentEntityFactory: PostContentEntityFactory
  ) {}

  private getRepository(type: PostType) {
    if (this.repositories.has(type)) {
      return this.repositories.get(type);
    }
    const repository = this.postContentRepositoryFactory.create(type);
    this.repositories.set(type, repository);

    return repository;
  }

  public async save(
    type: PostType,
    content: PostContent
  ): Promise<BasePostContentEntity | undefined> {
    const entity = this.postContentEntityFactory.create(content);

    return this.getRepository(type)?.save(entity);
  }

  public async findById(type: PostType, id: string) {
    const entity = await this.getRepository(type)?.findById(id);

    if (!entity) {
      throw new NotFoundException(`Post content by id ${id} not found`);
    }

    return entity;
  }

  public async update(type: PostType, id: string, content: PostContent) {
    const entity = this.postContentEntityFactory.create(content);

    return this.getRepository(type)?.update(entity);
  }

  public async deleteById(type: PostType, id: string) {
    return this.getRepository(type)?.deleteById(id);
  }
}

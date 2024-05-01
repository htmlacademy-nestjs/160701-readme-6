import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientService } from '@project/blog-models';

import { BasePostgresRepository } from '@project/data-access';
import { MAX_TAG_LIMIT } from './tag.constant';
import { BlogTagEntity } from './tag.entity';
import { BlogTagFactory } from './tag.factory';
import { TagFilter, tagFilterToPrismaFilter } from './tag.filter';

@Injectable()
export class BlogTagRepository extends BasePostgresRepository<BlogTagEntity> {
  constructor(
    tagFactory: BlogTagFactory,
    readonly client: PrismaClientService
  ) {
    super(tagFactory, client);
  }

  public async save(entity: BlogTagEntity) {
    const record = await this.client.tag.create({
      data: { ...entity.toPOJO() },
    });

    return this.createEntityFromDocument(record);
  }

  public async findById(id: string): Promise<BlogTagEntity> {
    const document = await this.client.tag.findFirst({
      where: {
        id,
      },
    });

    if (!document) {
      throw new NotFoundException(`Category with id ${id} not found.`);
    }

    return this.createEntityFromDocument(document);
  }

  public async find(filter?: TagFilter): Promise<BlogTagEntity[]> {
    const where = tagFilterToPrismaFilter(filter);
    const documents = await this.client.tag.findMany({
      where,
      take: MAX_TAG_LIMIT,
    });

    return documents.map((document) => this.createEntityFromDocument(document));
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.tag.delete({
      where: {
        id,
      },
    });
  }

  public async update(tagEntity: BlogTagEntity) {
    const record = await this.client.tag.update({
      where: { id: tagEntity.id },
      data: {
        name: tagEntity.name,
      },
    });

    return this.createEntityFromDocument(record);
  }

  public async findByIds(ids: string[]): Promise<BlogTagEntity[]> {
    const records = await this.client.tag.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return records.map((record) => this.createEntityFromDocument(record));
  }
}

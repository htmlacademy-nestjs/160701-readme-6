import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientService } from '@project/blog-models';

import { BasePostgresRepository } from '@project/data-access';
import { MAX_TAG_LIMIT } from './tag.constant';
import { TagEntity } from './tag.entity';
import { TagFactory } from './tag.factory';
import { TagFilter, tagFilterToPrismaFilter } from './tag.filter';

@Injectable()
export class TagRepository extends BasePostgresRepository<TagEntity> {
  constructor(tagFactory: TagFactory, readonly client: PrismaClientService) {
    super(tagFactory, client);
  }

  public async save(entity: TagEntity) {
    const record = await this.client.tag.create({
      data: { ...entity.toPOJO() },
    });

    return this.createEntityFromDocument(record);
  }

  public async findById(id: string): Promise<TagEntity> {
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

  public async find(filter?: TagFilter): Promise<TagEntity[]> {
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

  public async update(tagEntity: TagEntity) {
    const record = await this.client.tag.update({
      where: { id: tagEntity.id },
      data: {
        name: tagEntity.name,
      },
    });

    return this.createEntityFromDocument(record);
  }

  public async findByIds(ids: string[]): Promise<TagEntity[]> {
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

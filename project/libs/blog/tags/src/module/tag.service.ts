import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { TagEntity } from './tag.entity';
import { TagRepository } from './tag.repository';
import { CreateTagDto, UpdateTagDto } from '@project/dto';

@Injectable()
export class TagService {
  constructor(private readonly tagRepository: TagRepository) {}

  public async getTag(id: string): Promise<TagEntity> {
    return this.tagRepository.findById(id);
  }

  public async getAllTags(): Promise<TagEntity[]> {
    return this.tagRepository.find();
  }

  public async createTag(dto: CreateTagDto): Promise<TagEntity> {
    const existsTag = (await this.tagRepository.find({ name: dto.name })).at(0);

    if (existsTag) {
      throw new ConflictException('A tag with the name already exists');
    }

    const newTag = new TagEntity(dto);

    return this.tagRepository.save(newTag);
  }

  public async deleteTag(id: string): Promise<void> {
    try {
      await this.tagRepository.deleteById(id);
    } catch {
      throw new NotFoundException(`Tag with ID ${id} not found`);
    }
  }

  public async updateTag(id: string, dto: UpdateTagDto): Promise<TagEntity> {
    const tagEntity = await this.getTag(id);
    const newTagEntity = Object.assign(tagEntity, { ...dto });

    try {
      await this.tagRepository.update(newTagEntity);

      return tagEntity;
    } catch {
      throw new NotFoundException(`Tag with ID ${id} not found`);
    }
  }

  public async getTagsByIds(tagIds: string[]): Promise<TagEntity[]> {
    const tags = await this.tagRepository.findByIds(tagIds);

    if (tags.length !== tagIds.length) {
      const foundTagIds = tags.map((tag) => tag.id);
      const notFoundTagIds = tagIds.filter(
        (tagId) => !foundTagIds.includes(tagId)
      );

      if (notFoundTagIds.length > 0) {
        throw new NotFoundException(
          `Tag with ids ${notFoundTagIds.join(', ')} not found.`
        );
      }
    }

    return tags;
  }

  public async getTagsByNames(tagNames: string[]): Promise<TagEntity[]> {
    const tags = await this.tagRepository.findByNames(tagNames);

    if (tags.length !== tagNames.length) {
      const foundTagNames = tags.map((tag) => tag.name);
      const notFoundTagIds = tagNames.filter(
        (tagId) => !foundTagNames.includes(tagId)
      );

      if (notFoundTagIds.length > 0) {
        const promises = notFoundTagIds.map((el) =>
          this.createTag({ name: el })
        );
        const tags = await Promise.all(promises);

        return tags;
      }
    }

    return tags;
  }
}

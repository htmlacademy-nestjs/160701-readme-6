import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagEntity } from './tag.entity';
import { TagRepository } from './tag.repository';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagService {
  constructor(private readonly blogTagRepository: TagRepository) {}

  public async getTag(id: string): Promise<TagEntity> {
    return this.blogTagRepository.findById(id);
  }

  public async getAllTags(): Promise<TagEntity[]> {
    return this.blogTagRepository.find();
  }

  public async createTag(dto: CreateTagDto): Promise<TagEntity> {
    const existsTag = (
      await this.blogTagRepository.find({ name: dto.name })
    ).at(0);

    if (existsTag) {
      throw new ConflictException('A tag with the name already exists');
    }

    const newTag = new TagEntity(dto);

    return this.blogTagRepository.save(newTag);
  }

  public async deleteTag(id: string): Promise<void> {
    try {
      await this.blogTagRepository.deleteById(id);
    } catch {
      throw new NotFoundException(`Tag with ID ${id} not found`);
    }
  }

  public async updateTag(id: string, dto: UpdateTagDto): Promise<TagEntity> {
    const tagEntity = await this.getTag(id);
    const newTagEntity = Object.assign(tagEntity, { ...dto });

    try {
      await this.blogTagRepository.update(newTagEntity);

      return tagEntity;
    } catch {
      throw new NotFoundException(`Tag with ID ${id} not found`);
    }
  }

  public async getTagsByIds(tagIds: string[]): Promise<TagEntity[]> {
    const tags = await this.blogTagRepository.findByIds(tagIds);

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
}

import { Injectable, NotFoundException } from '@nestjs/common';

import { PaginationResult, PostStatus, PostType } from '@project/shared/core';

import { PostRepository } from './repositories/post.repository';

import { PostEntity } from './entitites/post.entity';
import { PostQuery } from './post.query';

import { PostFactory } from './post.factory';
import { UpdatePostDto } from './dto/update/update-post.dto';
import { CreatePostWithAuthorDto } from './dto/create-post.dto';
import { PostContentService } from './post-content/post-content.service';
import { TagService } from '@project/blog-tags';

@Injectable()
export class PostService {
  constructor(
    private readonly postFactory: PostFactory,
    private readonly postRepository: PostRepository,
    private readonly postContentService: PostContentService,
    private readonly tagService: TagService
  ) {}

  public async getAllPosts(
    query?: PostQuery
  ): Promise<PaginationResult<PostEntity>> {
    return this.postRepository.find(query);
  }

  public async create(dto: CreatePostWithAuthorDto): Promise<PostEntity> {
    const tags = await this.tagService.getTagsByNames(dto.tags);
    const newPostEntity = this.postFactory.create({
      ...dto,
      status: PostStatus.PUBLIC,
      comments: [],
      likes: [],
      tags,
    });
    const newPost = await this.postRepository.save(newPostEntity);

    await this.postContentService.save(dto.type, {
      ...dto.content,
      postId: String(newPost.id),
    });

    const foundedPost = await this.postRepository.findById(String(newPost.id));

    return foundedPost;
  }

  public async delete(id: string): Promise<void> {
    try {
      await this.postRepository.deleteById(id);
    } catch {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
  }

  public async findById(id: string): Promise<PostEntity> {
    return this.postRepository.findById(id);
  }

  public async updatePost(id: string, dto: UpdatePostDto): Promise<PostEntity> {
    return this.findById(id);
  }

  public async postTypesAll() {
    const types = Object.values(PostType);

    return types;
  }
}

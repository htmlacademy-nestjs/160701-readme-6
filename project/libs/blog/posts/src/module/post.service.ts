import { Injectable, NotFoundException } from '@nestjs/common';

import {
  CreatePostDto,
  PaginationResult,
  PostStatus,
  PostType,
} from '@project/shared/core';

import { PostRepository } from './repositories/post.repository';

import { PostEntity } from './entitites/post.entity';
import { PostQuery } from './post.query';

import { PostFactory } from './post.factory';
import { UpdatePostDto } from './dto/update/update-post.dto';
import { CreatePostWithAuthorDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  public async getAllPosts(
    query?: PostQuery
  ): Promise<PaginationResult<PostEntity>> {
    return this.postRepository.find(query);
  }

  public async createPost(dto: CreatePostWithAuthorDto): Promise<PostEntity> {
    const newPost = new PostFactory().create({
      ...dto,
      title: '',
      status: PostStatus.PUBLIC,
      comments: [],
      likes: [],
      tags: [],
    });
    await this.postRepository.save(newPost);

    return newPost;
  }

  public async deletePost(id: string): Promise<void> {
    try {
      await this.postRepository.deleteById(id);
    } catch {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
  }

  public async getPost(id: string): Promise<PostEntity> {
    return this.postRepository.findById(id);
  }

  public async updatePost(id: string, dto: UpdatePostDto): Promise<PostEntity> {
    return this.getPost(id);
  }

  public async postTypesAll() {
    const types = Object.values(PostType);

    return types;
  }
}

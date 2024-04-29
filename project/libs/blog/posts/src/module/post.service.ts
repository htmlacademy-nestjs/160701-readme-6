import { Injectable, NotFoundException } from '@nestjs/common';

import {
  CreatePostDto,
  PaginationResult,
  PostStatus,
} from '@project/shared/core';

import { PostRepository } from './posts.repository';

import { PostEntity } from './post.entity';
import { PostQuery } from './post.query';

import { PostFactory } from './post.factory';
import { UpdatePostDto } from './dto/update/update-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  public async getAllPosts(
    query?: PostQuery
  ): Promise<PaginationResult<PostEntity>> {
    return this.postRepository.find(query);
  }

  public async createPost(dto: CreatePostDto): Promise<PostEntity> {
    const newPost = new PostFactory().create({
      ...dto,
      authorId: '',
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
}

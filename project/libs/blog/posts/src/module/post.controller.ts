import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { fillDto } from '@project/shared/helpers';
import { PostRdo } from './rdo/post.rdo';
import { UpdatePostDto } from './dto/update/update-post.dto';
import { PostService } from './post.service';
import { PostQuery } from './post.query';
import { PostWithPaginationRdo } from './rdo/post-with-pagination.rdo';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostTypesRdo } from './rdo/post-types.rdo';
import { CreatePostWithAuthorDto } from './dto/create-post.dto';

@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiResponse({
    type: PostTypesRdo,
    status: HttpStatus.OK,
  })
  @ApiOperation({
    summary: 'Получить типы всех постов',
  })
  @Get('types')
  public async postTypesAll() {
    const types = await this.postService.postTypesAll();

    return fillDto(PostTypesRdo, { data: types });
  }

  @ApiOperation({
    summary: 'Получить все посты',
  })
  @ApiResponse({
    isArray: true,
    type: PostRdo,
    status: HttpStatus.OK,
  })
  @Get('/')
  public async index(@Query() query: PostQuery) {
    const postsWithPagination = await this.postService.getAllPosts(query);
    const result = {
      ...postsWithPagination,
      entities: postsWithPagination.entities.map((post) => post.toPOJO()),
    };

    return fillDto(PostWithPaginationRdo, result);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
  })
  @ApiOperation({
    summary: 'Получить пост по id',
  })
  @Get('/:id')
  public async show(@Param('id') id: string) {
    const post = await this.postService.findById(id);

    return fillDto(PostRdo, post.toPOJO());
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: 'Post create successfully',
  })
  @ApiOperation({
    summary: 'Создать пост',
  })
  @Post('/')
  public async create(@Body() dto: CreatePostWithAuthorDto) {
    const newPost = await this.postService.create(dto);

    return fillDto(PostRdo, newPost.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.OK,
  })
  @ApiOperation({
    summary: 'Удалить пост по id',
  })
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async destroy(@Param('id') id: string) {
    await this.postService.delete(id);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
  })
  @ApiOperation({
    summary: 'Обновить пост по id',
  })
  @Patch('/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    const updatedPost = await this.postService.updatePost(id, dto);

    return fillDto(PostRdo, updatedPost.toPOJO());
  }
}

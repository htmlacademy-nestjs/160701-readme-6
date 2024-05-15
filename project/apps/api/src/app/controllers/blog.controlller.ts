import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AxiosExceptionFilter } from '../filters/axios-exception.filter';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import { InjectUserIdInterceptor } from '@project/interceptors';
import { AuthKeyName, fillDto } from '@project/shared/helpers';
import {
  CreatePostDto,
  CreatePostWithAuthorDto,
  PostQuery,
  PostRdo,
  PostWithAuthorFullRdo,
  PostWithPaginationRdo,
  UploadedFileRdo,
  UserRdo,
} from '@project/shared/core';
import { ApiService } from '../service/api.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('posts')
@Controller('posts')
@UseFilters(AxiosExceptionFilter)
export class BlogController {
  constructor(private readonly apiService: ApiService) {}

  @ApiBearerAuth(AuthKeyName)
  @ApiResponse({
    type: PostWithAuthorFullRdo,
    status: HttpStatus.CREATED,
    description: 'The new post has been successfully created.',
  })
  @ApiOperation({
    summary: 'Создать пост',
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Post('/')
  public async create(@Body() dto: CreatePostDto, @Req() req: any) {
    const userId = req['user']['sub'];
    const post = await this.apiService.blog<PostRdo>({
      method: 'post',
      endpoint: '',
      data: { ...dto, authorId: userId } as CreatePostWithAuthorDto,
    });

    const user = await this.apiService.users<UserRdo>({
      method: 'get',
      endpoint: 'info',
      options: this.apiService.getAuthorizationHeader(req),
    });

    if (user.avatar) {
      const file = await this.apiService.fileVault<UploadedFileRdo>({
        method: 'get',
        endpoint: user.avatar,
      });

      user.avatar = file.path;
    }

    return fillDto(PostWithAuthorFullRdo, { ...post, author: user });
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
    const posts = await this.apiService.blog({
      method: 'get',
      endpoint: '',
      options: { params: query },
    });

    return fillDto(PostWithPaginationRdo<PostWithAuthorFullRdo>, posts);
  }
}

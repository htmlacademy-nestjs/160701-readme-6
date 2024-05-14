import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
// import { AxiosExceptionFilter } from '../filters/axios-exception.filter';
// import { CheckAuthGuard } from '../guards/check-auth.guard';
import { InjectUserIdInterceptor } from '@project/interceptors';
import { AuthKeyName, fillDto } from '@project/shared/helpers';
import { CreatePostDto, UploadedFileRdo, UserRdo } from '@project/shared/core';
import { ApiService } from '../service/api.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PostRdo } from '../rdo/post.rdo';

@ApiTags('posts')
@Controller('posts')
// @UseFilters(AxiosExceptionFilter)
export class BlogController {
  constructor(private readonly apiService: ApiService) {}

  @ApiBearerAuth(AuthKeyName)
  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: 'The new post has been successfully created.',
  })
  @ApiOperation({
    summary: 'Создать пост',
  })
  // @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Post('/')
  public async create(@Body() dto: CreatePostDto, @Req() req: any) {
    const userId = req['user']['sub'];

    const post = await this.apiService.blog<PostRdo>({
      method: 'post',
      endpoint: '',
      data: { ...dto, author: userId },
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

    return fillDto(PostRdo, { ...post, author: user });
  }
}

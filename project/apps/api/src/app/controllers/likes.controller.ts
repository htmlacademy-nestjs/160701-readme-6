import {
  Controller,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthKeyName, generateSchemeApiError } from '@project/shared/helpers';
import { LikeRdo } from '@project/rdo';
import { AxiosExceptionFilter } from '../filters/axios-exception.filter';
import { ApiService } from '../service/api.service';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import { InjectUserIdInterceptor } from '@project/interceptors';
import { RequestWithUserId } from '@project/shared/core';

@ApiTags('likes')
@UseFilters(AxiosExceptionFilter)
@Controller('posts/:postId/likes')
export class LikesController {
  constructor(private readonly apiService: ApiService) {}

  @ApiResponse({
    type: LikeRdo,
    description: 'Create like',
    status: HttpStatus.CREATED,
  })
  @ApiResponse({
    schema: generateSchemeApiError('Like exists', HttpStatus.CONFLICT),
    description: 'Like exists',
    status: HttpStatus.CONFLICT,
  })
  @ApiParam({
    name: 'postId',
    required: true,
    description: 'Should be an id of a post that exists in the database',
    type: String,
  })
  @ApiOperation({
    summary: 'Создать лайк',
    description: 'Create like',
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @ApiBearerAuth(AuthKeyName)
  @Post()
  public async create(
    @Param('postId') postId: string,
    @Req() req: RequestWithUserId
  ) {
    const {
      body: { userId },
    } = req;
    const like = await this.apiService.blog<unknown, LikeRdo>({
      method: 'post',
      endpoint: `${postId}/likes`,
      options: { params: { userId } },
    });

    return like;
  }
}

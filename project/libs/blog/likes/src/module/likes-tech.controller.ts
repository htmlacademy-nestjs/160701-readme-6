import { Controller, Get, HttpStatus } from '@nestjs/common';
import { LikesService } from './likes.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LikeRdo } from './rdo/like.rdo';

@ApiTags('likes')
@Controller('/likes')
export class LikesTechController {
  constructor(private readonly likesService: LikesService) {}

  @ApiResponse({
    isArray: true,
    type: LikeRdo,
    description: 'Get all likes',
    status: HttpStatus.OK,
  })
  @ApiOperation({
    summary: 'Получить все лайки',
    description: 'Get all likes',
  })
  @Get('/all')
  public async getAll() {
    const likes = await this.likesService.getAll();

    return likes;
  }
}

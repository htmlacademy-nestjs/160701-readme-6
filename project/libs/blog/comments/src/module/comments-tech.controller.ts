import { Controller, Get, HttpStatus } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillDto, generateSchemeApiError } from '@project/shared/helpers';
import { CommentRdo } from './rdo/comment.rdo';

@ApiTags('comments')
@Controller('comments')
export class CommentsTechController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiResponse({
    isArray: true,
    type: CommentRdo,
    status: HttpStatus.OK,
    description: 'Get all comments',
  })
  @ApiOperation({
    summary: 'Получить все комментарии',
    description: 'Get all comments',
  })
  @Get('/all')
  public async findAll() {
    const commentsEntities = await this.commentsService.findAll();
    const comments = commentsEntities.map((el) => el.toPOJO());

    return fillDto(CommentRdo, comments);
  }
}

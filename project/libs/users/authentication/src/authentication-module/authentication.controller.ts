import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { fillDto, generateSchemeApiError } from '@project/shared/helpers';
import { UserRdo } from '../rdo/user.rdo';
import { LoginUserDto } from '../dto/login-user.dto';
import { LoggedUserRdo } from '../rdo/logged-user.rdo';
import { AuthService } from './authentication.interface';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticationResponseMessage } from './authentication.constant';
import { MongoIdValidationPipe } from '@project/pipes';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthenticationController {
  constructor(
    @Inject('AuthService')
    private readonly authService: AuthService
  ) {}

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.CREATED,
    description: AuthenticationResponseMessage.UserCreated,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: AuthenticationResponseMessage.UserExist,
    schema: generateSchemeApiError(
      AuthenticationResponseMessage.UserExist,
      HttpStatus.CONFLICT
    ),
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request data',
    schema: generateSchemeApiError('Bad request data', HttpStatus.BAD_REQUEST),
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);

    return fillDto(UserRdo, newUser.toPOJO());
  }

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: AuthenticationResponseMessage.LoggedSuccess,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: AuthenticationResponseMessage.LoggedError,
  })
  @Post('login')
  public async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.authService.verifyUser(dto);
    const userToken = await this.authService.createUserToken(verifiedUser);

    return fillDto(LoggedUserRdo, { ...verifiedUser.toPOJO(), ...userToken });
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: AuthenticationResponseMessage.UserFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: AuthenticationResponseMessage.UserNotFound,
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async show(@Param('id', MongoIdValidationPipe) id: string) {
    const existUser = await this.authService.getUserById(id);

    return fillDto(UserRdo, existUser.toPOJO());
  }
}

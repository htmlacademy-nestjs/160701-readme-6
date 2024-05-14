import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import {
  AuthKeyName,
  fillDto,
  generateSchemeApiError,
} from '@project/shared/helpers';
import { UserRdo } from '../rdo/user.rdo';
import { LoggedUserRdo } from '../rdo/logged-user.rdo';
import { AuthService } from './authentication.interface';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticationResponseMessage } from './authentication.constant';
import { MongoIdValidationPipe } from '@project/pipes';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import {
  ChangePasswordDto,
  ChangePasswordRdo,
  RecoveryEmailRdo,
  RefreshUserRdo,
} from '@project/shared/core';
import { RecoveryEmailDto } from '../dto/recovery-email.dto';
import { PasswordTokenService } from '../password-token-module/password-token.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { RequestWithUser } from './request-with-user.interface';
import { JwtRefreshGuard } from '../guards/jwt-refresh.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthenticationController {
  constructor(
    @Inject('AuthService')
    private readonly authService: AuthService,
    private readonly passwordTokenService: PasswordTokenService
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
    schema: generateSchemeApiError(
      AuthenticationResponseMessage.UserOrPasswordNotCorrect,
      HttpStatus.UNAUTHORIZED
    ),
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Req() { user }: RequestWithUser) {
    const userToken = await this.authService.createUserToken(user);

    return fillDto(LoggedUserRdo, { ...user.toPOJO(), ...userToken });
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
  @ApiBearerAuth(AuthKeyName)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async show(@Param('id', MongoIdValidationPipe) id: string) {
    const existUser = await this.authService.getUserById(id);

    return fillDto(UserRdo, existUser.toPOJO());
  }

  @ApiResponse({
    type: ChangePasswordRdo,
    status: HttpStatus.OK,
    description: 'Password changed successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: AuthenticationResponseMessage.UserNotFound,
    schema: generateSchemeApiError(
      AuthenticationResponseMessage.UserNotFound,
      HttpStatus.NOT_FOUND
    ),
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request data',
    schema: generateSchemeApiError('Bad request data', HttpStatus.BAD_REQUEST),
  })
  @ApiBearerAuth(AuthKeyName)
  @UseGuards(JwtAuthGuard)
  @Patch('change-password/:sub')
  public async changePassword(
    // @Req() { user }: RequestWithTokenPayload,
    @Param('sub', MongoIdValidationPipe) sub: string,
    @Body() dto: ChangePasswordDto
  ) {
    await this.authService.changePassword(
      // String(user?.sub),
      sub,
      dto
    );

    return fillDto(ChangePasswordRdo, {
      message: 'Password changed successfully',
    });
  }

  @ApiResponse({
    type: RecoveryEmailRdo,
    status: HttpStatus.CREATED,
    description: 'Recovery email sent successfully',
  })
  @Post('recovery-email')
  public async recoveryPassword(@Body() dto: RecoveryEmailDto) {
    const { email } = dto;
    const recoveryToken = await this.authService.recoveryEmail(dto);

    await this.passwordTokenService.deletePasswordTokensByEmail(email);
    await this.passwordTokenService.createPasswordSession({
      tokenId: recoveryToken,
      userEmail: email,
    });

    return fillDto(RecoveryEmailRdo, {
      message: 'Recovery email sent successfully',
    });
  }

  @ApiBearerAuth(AuthKeyName)
  @UseGuards(JwtRefreshGuard)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: RefreshUserRdo,
    status: HttpStatus.OK,
    description: 'Get a new access/refresh tokens',
  })
  @Post('refresh')
  public async refreshToken(@Req() { user }: RequestWithUser) {
    return this.authService.createUserToken(user);
  }
}

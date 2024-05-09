import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import {
  AuthKeyName,
  fillDto,
  generateSchemeApiError,
} from '@project/shared/helpers';
import { UserRdo } from '../rdo/user.rdo';
import { LoginUserDto } from '../dto/login-user.dto';
import { LoggedUserRdo } from '../rdo/logged-user.rdo';
import { AuthService } from './authentication.interface';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticationResponseMessage } from './authentication.constant';
import { MongoIdValidationPipe } from '@project/pipes';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { NotifyService } from '@project/users-notify';
import { ChangePasswordDto, ChangePasswordRdo } from '@project/shared/core';
import { RecoveryEmailDto } from '../dto/recovery-email.dto';
import { PasswordTokenService } from '../password-token-module/password-token.service';

@ApiTags('auth')
@Controller('auth')
export class AuthenticationController {
  constructor(
    @Inject('AuthService')
    private readonly authService: AuthService,
    private readonly notifyService: NotifyService,
    private readonly passswortTokenService: PasswordTokenService
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
    const { email, firstname, id } = newUser;
    await this.notifyService.registerSubscriber({
      email,
      firstname,
      userId: String(id),
    });

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
    description: 'User not found',
    schema: generateSchemeApiError('User not found', HttpStatus.NOT_FOUND),
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
    const newUser = await this.authService.changePassword(
      // String(user?.sub),
      sub,
      dto
    );
    const { email, firstname, id: userId } = newUser.toPOJO();

    await this.notifyService.changePassword({
      email,
      firstname,
      userId: String(userId),
    });

    return fillDto(ChangePasswordRdo, {
      message: 'Password changed successfully',
    });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Recovery email sent successfully',
  })
  @Post('recovery-email')
  public async recoveryPassword(@Body() dto: RecoveryEmailDto) {
    const recoveryToken = await this.authService.recoveryEmail(dto);

    if (recoveryToken) {
      await this.passswortTokenService.createPasswordSession({
        tokenId: recoveryToken,
        userEmail: dto.email,
      });
      await this.notifyService.recoveryEmail({
        email: dto.email,
        recoveryToken,
      });
    }

    return {
      recoveryToken,
      message: 'Recovery email sent successfully',
    };
  }
}

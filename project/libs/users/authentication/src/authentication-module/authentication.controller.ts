import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { fillDto } from '@project/shared/helpers';
import { UserRdo } from '../rdo/user.rdo';
import { LoginUserDto } from '../dto/login-user.dto';
import { LoggedUserRdo } from '../rdo/logged-user.rdo';
import { AuthService } from './authentication.interface';

@Controller('auth')
export class AuthenticationController {
  constructor(
    @Inject('AuthService')
    private readonly authService: AuthService
  ) {}

  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);

    return fillDto(UserRdo, newUser.toPOJO());
  }

  @Post('login')
  public async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.authService.verifyUser(dto);

    return fillDto(LoggedUserRdo, verifiedUser.toPOJO());
  }

  @Get(':id')
  public async show(@Param('id') id: string) {
    const existUser = await this.authService.getUser(id);

    return fillDto(UserRdo, existUser.toPOJO());
  }
}

import { Injectable, LoggerService } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { AuthService } from './authentication.interface';
import { BlogUserEntity } from '@project/blog-user';

@Injectable()
export class AuthenticationLoggerService implements AuthService {
  constructor(
    private readonly logger: LoggerService,
    private readonly proxy: AuthService
  ) {}

  public async register(dto: CreateUserDto) {
    return Promise.resolve(new BlogUserEntity());
  }

  public async verifyUser(dto: LoginUserDto) {
    return Promise.resolve(new BlogUserEntity());
  }

  public async getUser(id: string) {
    return Promise.resolve(new BlogUserEntity());
  }
}

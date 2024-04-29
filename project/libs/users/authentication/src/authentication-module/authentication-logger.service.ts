import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { AuthService } from './authentication.interface';
import { User } from '@project/shared/core';

@Injectable()
export class AuthenticationLoggerService implements AuthService {
  private readonly logger = new Logger(AuthenticationLoggerService.name);

  constructor(private readonly proxy: AuthService) {}

  public async register(dto: CreateUserDto) {
    try {
      const entity = await this.proxy.register(dto);
      this.logger.log(`Успешная регистрация: ${entity.email}`);

      return entity;
    } catch (e: any) {
      this.logger.error(`Ошибка регистрации: ${e?.message}`);
      throw e;
    }
  }

  public async verifyUser(dto: LoginUserDto) {
    return this.proxy.verifyUser(dto);
  }

  public async getUserById(id: string) {
    return this.proxy.getUserById(id);
  }

  public async getUserByEmail(id: string) {
    return this.proxy.getUserByEmail(id);
  }

  public async createUserToken(user: User) {
    return this.proxy.createUserToken(user);
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { AuthService } from './authentication.interface';

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

  public async getUser(id: string) {
    return this.proxy.getUser(id);
  }
}

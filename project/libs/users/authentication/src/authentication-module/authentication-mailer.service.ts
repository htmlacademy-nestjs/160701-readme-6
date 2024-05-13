import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { AuthService } from './authentication.interface';
import { ChangePasswordDto } from '@project/shared/core';
import { RecoveryEmailDto } from '../dto/recovery-email.dto';
import { BlogUserEntity } from '@project/blog-user';

@Injectable()
export class AuthenticationMailerService implements AuthService {
  constructor(private readonly proxy: AuthService) {}

  public async register(dto: CreateUserDto) {
    return this.proxy.register(dto);
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

  public async createUserToken(user: BlogUserEntity) {
    return this.proxy.createUserToken(user);
  }

  public async changePassword(id: string, dto: ChangePasswordDto) {
    return this.proxy.changePassword(id, dto);
  }

  public async recoveryEmail(dto: RecoveryEmailDto) {
    return this.proxy.recoveryEmail(dto);
  }
}

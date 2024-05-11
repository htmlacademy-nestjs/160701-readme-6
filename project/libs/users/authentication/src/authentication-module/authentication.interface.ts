import { BlogUserEntity } from '@project/blog-user';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { ChangePasswordDto, Token } from '@project/shared/core';
import { RecoveryEmailDto } from '../dto/recovery-email.dto';

export interface AuthService {
  register(dto: CreateUserDto): Promise<BlogUserEntity>;
  verifyUser(dto: LoginUserDto): Promise<BlogUserEntity>;
  getUserById(id: string): Promise<BlogUserEntity>;
  getUserByEmail(email: string): Promise<BlogUserEntity>;
  createUserToken(user: BlogUserEntity): Promise<Token>;
  changePassword(id: string, dto: ChangePasswordDto): Promise<BlogUserEntity>;
  recoveryEmail(dto: RecoveryEmailDto): Promise<string>;
}

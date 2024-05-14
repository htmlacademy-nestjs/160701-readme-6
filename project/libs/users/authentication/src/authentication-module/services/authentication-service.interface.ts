import { BlogUserEntity } from '@project/blog-user';

import {
  ChangePasswordDto,
  CreateUserDto,
  LoginUserDto,
  RecoveryEmailDto,
  Token,
} from '@project/shared/core';

export interface AuthService {
  register(dto: CreateUserDto): Promise<BlogUserEntity>;
  verifyUser(dto: LoginUserDto): Promise<BlogUserEntity>;
  getUserById(id: string): Promise<BlogUserEntity>;
  getUserByEmail(email: string): Promise<BlogUserEntity>;
  createUserToken(user: BlogUserEntity): Promise<Token>;
  changePassword(id: string, dto: ChangePasswordDto): Promise<BlogUserEntity>;
  recoveryEmail(dto: RecoveryEmailDto): Promise<string>;
}

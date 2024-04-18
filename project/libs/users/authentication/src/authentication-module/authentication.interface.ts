import { BlogUserEntity } from '@project/blog-user';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';

export interface AuthService {
  register(dto: CreateUserDto): Promise<BlogUserEntity>;
  verifyUser(dto: LoginUserDto): Promise<BlogUserEntity>;
  getUser(id: string): Promise<BlogUserEntity>;
}

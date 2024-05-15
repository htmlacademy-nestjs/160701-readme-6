import { UserRole } from '../../../enums/users/user-role.enum';

export interface TokenPayload {
  sub: string;
  email: string;
  role: UserRole;
  firstname: string;
}

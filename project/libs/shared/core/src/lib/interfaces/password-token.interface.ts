export interface PasswordToken {
  id?: string;
  createdAt?: Date;
  expiresIn?: Date;
  tokenId: string;
  userEmail: string;
}

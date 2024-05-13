export const AUTH_USER_EXISTS = 'User with this email exists';
export const AUTH_USER_NOT_FOUND = 'User not found';
export const AUTH_USER_NOT_FOUND_OR_PASSWORD_WRONG =
  'User or password is wrong';
export const OLD_PASSWORD_NOT_CORRECT = 'Old password is not correct';
export const AUTH_USER_EMAIL_NOT_VALID = 'The email is not valid';

export const AuthenticationResponseMessage = {
  LoggedSuccess: 'User has been successfully logged.',
  LoggedError: 'Password or Login is wrong.',
  UserFound: 'User found',
  UserNotFound: 'User not found',
  UserExist: 'User with the email already exists',
  UserCreated: 'The new user has been successfully created.',
  UserOrPasswordNotCorrect: AUTH_USER_NOT_FOUND_OR_PASSWORD_WRONG,
} as const;

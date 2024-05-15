import { Request } from 'express';

export interface RequestWithUserId extends Request {
  body: {
    userId: string;
  };
}

import { Document } from 'mongoose';

export interface IUser extends Document {
  readonly id: string;
  readonly username: string;
  readonly password: string;
}

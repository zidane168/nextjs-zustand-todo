import { Document } from 'mongoose';

export interface ITodo extends Document {
  readonly id: number;
  readonly username: string;
  readonly type: number;
  readonly createDate: Date;
  readonly dueDate: Date;
  readonly job: string;
  readonly status: string;
}

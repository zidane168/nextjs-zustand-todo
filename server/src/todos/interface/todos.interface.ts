import { Document } from 'mongoose';

export interface ITodo extends Document {
  id: string;
  username: string;
  type: number;
  createDate: Date;
  dueDate: Date;
  remark: string;
  job: string;
  status: string;
}

import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
  id: Number,
  username: String,
  type: Number,
  createDate: Date,
  dueDate: Date,
  job: String,
  status: String
});

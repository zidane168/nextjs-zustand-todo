import * as mongoose from 'mongoose';

export const TodosSchema = new mongoose.Schema({
  id: String,
  username: String,
  type: Number,
  createDate: Date,
  dueDate: Date,
  job: String,
  status: String,
});

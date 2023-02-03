import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
  id: String,
  username: String,
  password: String,
});

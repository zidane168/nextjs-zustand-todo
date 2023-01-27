import * as mongoose from 'mongoose';
import { ObjectID } from 'typeorm';

export const UsersSchema = new mongoose.Schema({
  id: String,
  username: String,
  password: String,
});

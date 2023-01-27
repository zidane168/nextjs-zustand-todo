import { IUser } from './interface/users.interface';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { UsersDto } from './dto/users.dto';
import * as bcrypt from 'bcrypt'; 
@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

  // http://localhost:8000/users => ok
  public async getUsers(): Promise<UsersDto[]> {
    const users = await this.userModel.find().exec();

    if (!users || !users[0]) {
      throw new HttpException('User Not Found', 404);
    }
    return users;
  }

  public async login(user: UsersDto) { 
    const result = await this.userModel.findOne({
      username: user.username,
    });

    if (!result) {
      return null;
    }

    const isMatch = await bcrypt.compare(user.password, result.password);
    if (!isMatch) {
      return null;
    }

    return result;
  }

  public async register(newUser: UsersDto) {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(newUser.password, salt);

    newUser.password = hashPassword;
    const user = await new this.userModel(newUser);
    return user.save();
  }

  async validate(id: string) {
    const user = await this.getUserById(id);
    return user ? user : null;
  }

  public async getUserById(id: string): Promise<UsersDto> {
  
    console.log(id)
    const user = await this.userModel
      .findById({ _id: new mongoose.Types.ObjectId(id) })   // use this way for get mongo objectID
      .exec(); 
  
    if (!user) {
      throw new HttpException('Not found*!!', 404);
    }

    return user;
  }

  public async deleteUserById(id: string): Promise<any> {
    const user = await this.userModel
      .deleteOne({ _id: new mongoose.Types.ObjectId(id) })
      .exec();
    if (user.deletedCount === 0) {
      throw new HttpException('Not Found', 404);
    }
    return true;
  }

  public async putUserById(
    id: string,
    propertyName: string,
    propertyValue: string,
  ): Promise<UsersDto> {
    const user = await this.userModel
      .findOneAndUpdate(
        { _id: new Types.ObjectId(id) },
        {
          [propertyName]: [propertyValue],
        },
      )
      .exec();

    if (!user) {
      throw new HttpException('Not Found', 404);
    }
    return user;
  }
}

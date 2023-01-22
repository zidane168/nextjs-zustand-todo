import { IUser } from './interface/users.interface';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersDto } from './dto/users.dto';

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

  public async register(newUser: UsersDto) {
    const user = await new this.userModel(newUser);
    return user.save();
  }

  public async getUserById(id: number): Promise<UsersDto> {
    const user = await this.userModel.findOne({ id }).exec();

    if (!user || !user[0]) {
      throw new HttpException('Not found', 404);
    }

    return user;
  }

  public async deleteUserById(id: number): Promise<any> {
    const user = await this.userModel.deleteOne({ id }).exec();
    if (user.deletedCount === 0) {      
      throw new HttpException('Not Found', 404);
    }
    return true;
  }

  public async putUserById(
    id: number,
    propertyName: string,
    propertyValue: string,
  ): Promise<UsersDto> {
    const user = await this.userModel
      .findOneAndUpdate(
        { id },
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

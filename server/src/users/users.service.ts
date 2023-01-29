import { ApiErrorResponse } from './../util/api-error-response.util';
import { ApiSucceedResponse } from 'src/util/api-success-response.util';
import { IUser } from './interface/users.interface';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { UsersDto } from './dto/users.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<IUser>,
    private readonly jwtService: JwtService,
  ) {}

  // http://localhost:8000/users => ok
  public async getUsers() {
    const users = await this.userModel.find().exec();

    if (!users || !users[0]) {
      throw new HttpException('User Not Found', 404);
    }
    return new ApiSucceedResponse("Retrieved all users", users);
  }

  public async login(user: UsersDto) {
    const result = await this.userModel.findOne({
      username: user.username,
    });

    if (!result) {
      throw new HttpException('User not found', 404);
    }

    const isMatch = await bcrypt.compare(user.password, result.password);
    if (!isMatch) {
      return new ApiErrorResponse('Password is not match', []);
    }
 
    const access_token = await this.jwtService.sign({ id: result._id });
    return new ApiSucceedResponse('Login succeed', access_token);
  }

  public async register(newUser: UsersDto) {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(newUser.password, salt);

    newUser.password = hashPassword;
    const user = await new this.userModel(newUser);
    user.save();

    if (user) {
      return new ApiSucceedResponse('Registered user successfully', user);
    }

    return new ApiErrorResponse('Registered user failed', []);
  }

  async validate(id: string) {
    const user = await this.getUserById(id);
    return user ? user : null;
  }

  public async getUserById(id: string) {
    const user = await this.userModel
      .findById({ _id: new mongoose.Types.ObjectId(id) }) // use this way for get mongo objectID
      .exec();

    if (!user) {
      throw new HttpException('User Not Found!', 404);
    }

    return new ApiSucceedResponse('Retrieved data successfully', user);
  }

  public async deleteUserById(id: string) {
    const user = await this.userModel
      .deleteOne({ _id: new mongoose.Types.ObjectId(id) })
      .exec();
    if (user.deletedCount === 0) {
      throw new HttpException('User Not Found', 404);
    }
    return new ApiSucceedResponse('User was removed', []);
  }

  public async putUserById(
    id: string,
    propertyName: string,
    propertyValue: string,
  ) {
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
    return new ApiSucceedResponse('User was update succeed', user);
  }

  public async getProfile(id: number) {
    let user = await this.userModel
      .findById({
        _id: id,
      })
      .exec();

    if (!user) {
      throw new HttpException('User Not Found', 404);
    }

    return new ApiSucceedResponse('Retrieved data successfully', user);
  }
}

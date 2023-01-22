import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';

import { ApiErrorResponse } from 'src/util/api-error-response.util';
import { ApiSucceedResponse } from 'src/util/api-success-response.util';
import { UsersDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
 

  @Get()
  public async getUsers(): Promise<any> {
    const users = await this.usersService.getUsers();
    return new ApiSucceedResponse('Retrieved data successfully: ', users);
  }

  @Post()
  public async register(newUser: UsersDto) {
    const user = await this.usersService.register(newUser);
    return new ApiSucceedResponse('Register data successfully', user);
  }

  @Get(':id')
  public async getUserById(id: number): Promise<any> {
    const user = await this.usersService.getUserById(id);
    return new ApiSucceedResponse('Retrieved data successfully', user);
  }

  public async deleteUserById(id: number): Promise<any> {
    const user = await this.usersService.deleteUserById(id);
    return new ApiSucceedResponse('Deleted data successfully', user);
  }

  public async putUserById(
    id: number,
    propertyName: string,
    propertyValue: string,
  ): Promise<any> {
    const user = await this.usersService.putUserById(
      id,
      propertyName,
      propertyValue,
    );
    return new ApiSucceedResponse('User', user);
  }
}

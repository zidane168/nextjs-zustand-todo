eal; // https://www.youtube.com/watch?v=L3JZhj9Odfg&t=1233s

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

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  // @Get(':username')
  // async findOne(@Param('username') username: string) {
  //   const result = await this.usersService.findOne(username);

  //   return new ApiSucceedResponse('message: ', result)
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }

  public async getUsers(): Promise<UsersDto[]> {
    const users = await this.usersService.getUsers();
    return new ApiSucceedResponse('Users: ', users);
  }

  @Post()
  public async register(newUser: UsersDto) {
    const user = await this.usersService.register(newUser);
    return new ApiSucceedResponse('User', user);
  }

  @Get(':id')
  public async getUserById(id: number): Promise<UsersDto> {
    const user = await this.usersService.getUserById(id);
    return new ApiSucceedResponse('User', user);
  }

  public async deleteUserById(id: number): Promise<UsersDto> {
    const user = await this.usersService.deleteUserById(id);
    return new ApiSucceedResponse('User', user);
  }

  public async putUserById(
    id: number,
    propertyName: string,
    propertyValue: string,
  ): Promise<UsersDto> {
    const user = await this.usersService.putUserById(
      id,
      propertyName,
      propertyValue,
    );
    return new ApiSucceedResponse('User', user);
  }
}

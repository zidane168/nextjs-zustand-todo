// huuvi168@gmail.com
// Zidane - Learn Tech Tips

import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDto } from './dto/users.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  
  @UseGuards(JwtAuthGuard)
  @Get('getProfile')
  public async getProfile(@Request() req: any) {    
    return await this.usersService.getProfile(req.user.params._id);
  }

  @Get()
  public async getUsers(): Promise<any> {
    return await this.usersService.getUsers();
  }

  @Post('login')
  public async login(@Body() user: UsersDto) {
    return await this.usersService.login(user);
  }

  @Post('register')
  public async register(@Body() newUser: UsersDto) {
    return await this.usersService.register(newUser);
  }

  @Get(':id')
  public async getUserById(id: string) {
    return await this.usersService.getUserById(id);
  }

  @Delete()
  public async deleteUserById(id: string) {
    return await this.usersService.deleteUserById(id);
  }

  public async putUserById(
    id: string,
    propertyName: string,
    propertyValue: string,
  ) {
    return await this.usersService.putUserById(id, propertyName, propertyValue);
  }

}

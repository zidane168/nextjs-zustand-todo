import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module'
import { MongooseModule } from '@nestjs/mongoose'
 

@Module({
  imports: [ 
    MongooseModule.forRoot("mongodb+srv://zidane:2UlLw5DpA6jflZ4B@cluster0.v5zojtu.mongodb.net/todolist2"),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

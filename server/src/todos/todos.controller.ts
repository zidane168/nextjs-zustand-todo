import { ITodo } from './interface/todos.interface';
import { TodosDto } from './dto/todos.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Param,
  Delete,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { TodosSchema } from './schemas/todos.schema';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  public async get(@Request() req: any)  {
    // JWTAuthGuard will return req.user
    return await this.todosService.get(req.user.username);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  public async create(@Body() todosDto: TodosDto)  {
    return await this.todosService.create(todosDto);
  }
  
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
  //   return this.todosService.update(+id, updateTodoDto);
  // }

  @Delete(':id')
  public async removeTodo(@Param('id') id: string) {
     return await this.todosService.removeTodo(id);
  }
}

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
  Patch,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { TodosSchema } from './schemas/todos.schema';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  public async get(@Request() req: any) {
    // JWTAuthGuard will return req.user
    return await this.todosService.get(req.user.params.username);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  public async create(
    @Request() req: any,
    @Body() todosDto: TodosDto
  ) {
    
    return await this.todosService.create(todosDto, req.user.params.username);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  public async changeStatusTodo(@Param('id') id: string) {
    return await this.todosService.changeStatusTodo(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  public async removeTodo(@Param('id') id: string) {
    return await this.todosService.removeTodo(id);
  }
}

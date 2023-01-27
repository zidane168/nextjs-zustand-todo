import { TodosDto } from './dto/todos.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { ApiErrorResponse } from 'src/util/api-error-response.util';
import { ApiSucceedResponse } from 'src/util/api-success-response.util';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  public async get(username: string): Promise<any> {
    const todos = await this.todosService.get(username);
    return new ApiSucceedResponse('Retrieved data successfully', todos);
  }

  @Post()
  create(@Body() todosDto: TodosDto) {
    return this.todosService.create(todosDto);
  }

  // @Get()
  // findAll() {
  //   return this.todosService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.todosService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
  //   return this.todosService.update(+id, updateTodoDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.todosService.remove(+id);
  // }
}

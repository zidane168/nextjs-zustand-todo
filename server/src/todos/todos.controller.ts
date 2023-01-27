import { TodosDto } from './dto/todos.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { ApiErrorResponse } from 'src/util/api-error-response.util';
import { ApiSucceedResponse } from 'src/util/api-success-response.util';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';  

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  public async get(@Request() req: any): Promise<any> { 
    // JWTAuthGuard will return req.user
    const todos = await this.todosService.get(req.user.username);
    return new ApiSucceedResponse('Retrieved data successfully', todos)
  }

  // @AuthGuard( 'jwt' )
  // @Get('profile')
  // getUserId(@Request() req: any) {
  //   return req.user.id;
  // }


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

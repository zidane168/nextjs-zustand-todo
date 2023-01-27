import { TodosDto } from './dto/todos.dto';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITodo } from './interface/todos.interface';
import moment from 'moment';

@Injectable()
export class TodosService {
  constructor(@InjectModel('Todo') private readonly todoModel: Model<ITodo>) {}

  public async get(username: string): Promise<TodosDto[]> {
    const todos: TodosDto[] = await this.todoModel.findById({
      username: username,
    });

    if (!todos || !todos[0]) {
      throw new HttpException('Todo not found', 404);
    }

    return todos;
  }

  public async create(todo: TodosDto) {
    todo.createDate = moment().toDate();
    todo.status = 'DOING';
    const todoModel = await new this.todoModel(todo);
    return todoModel.save();
  }

  public async markCompleteTodo(id: Number) {
    let todo = await this.todoModel
      .findById({
        id: id,
      })
      .exec();

    if (!todo) {
      throw new HttpException('Todo Not Found', 404);
    }

    if (todo.status === 'COMPLETED') {
      todo.status = 'DOING';
    } else {
      todo.status = 'COMPLETED';
    }
  }

  public async removeTodo(id: Number) {
    const todo = await this.todoModel
      .deleteOne({
        id: id,
      })
      .exec();

    if (todo.deletedCount === 0) {
      throw new HttpException('Todo Not Found', 404);
    }

    return true;
  }
}

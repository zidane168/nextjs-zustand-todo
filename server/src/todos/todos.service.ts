import { TodosDto } from './dto/todos.dto';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ITodo } from './interface/todos.interface';
import * as moment from 'moment';
import { ApiSucceedResponse } from './../util/api-success-response.util';
import { ApiErrorResponse } from './../util/api-error-response.util';

@Injectable()
export class TodosService {
  constructor(@InjectModel('Todo') private readonly todoModel: Model<ITodo>) {}

  public async search(
    username: string,
    limit: number, 
    page: number, 
    job: string,
    type: number,
    status: string
  ) { 

    let conditions: any

    if (username) {
      conditions = { username };
    }
 
    if (job) {
      conditions = { ...conditions, job: { $regex: '.*' + job + '.*' } };   // search like
    } 
 
    if (type)  {
      conditions = { ...conditions, type };
    }
 
    if (status) {
      status = status.toUpperCase();
      conditions = { ...conditions, status };
    }
   
    const total:number = await this.todoModel.count( conditions ).exec()

    if (total == 0) {
      return new ApiSucceedResponse('No Task!', []);
    }

    console.log(conditions)

    const todo = await this.todoModel
      .find(conditions)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec() 

    if (!todo) {
      throw new HttpException('Todo not found', 404);
    }

    return new ApiSucceedResponse('Retrieved data successfully', {
      total: total,
      todos: todo,
    });
  }

  public async get(username: string) {
 
    const todos: TodosDto[] = await this.todoModel.find({
      username: username,
    });

    if (!todos) {
      throw new HttpException('Todo not found', 404);
    }

    return new ApiSucceedResponse('Retrieved data successfully', todos);
  }

  public async create(todo: TodosDto, username: string) {
    todo.createDate = moment().toDate();
    todo.status = 'DOING';
    todo.username = username;
 
    const todoModel = await new this.todoModel(todo);
    const save = todoModel.save();

    if (save) {
      return new ApiSucceedResponse('Data is saved', []);
    }

    return new ApiErrorResponse('Data is not saved', []);
  }

  public async changeStatusTodo(id: string) {
    const todo = await this.todoModel
      .findById({
        _id: new Types.ObjectId(id),
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

    await this.todoModel
      .updateOne(
        {
          _id: new Types.ObjectId(id),
        },
        todo,
      )
      .exec();

    return new ApiSucceedResponse(
      'Todo was succeed changed status to: ' + todo.status,
      [],
    );
  }

  public async getTodoById(id: string) {
    const todo = await this.todoModel
      .findById({
        _id: new Types.ObjectId(id),
      })
      .exec();

    return todo;
  }

  public async removeTodo(id: string) {
    const todo = await this.todoModel
      .deleteOne({
        _id: new Types.ObjectId(id),
      })
      .exec();

    if (todo.deletedCount === 0) {
      throw new HttpException('Todo Not Found', 404);
    }

    return new ApiSucceedResponse('Todo is deleted', []);
  }
}

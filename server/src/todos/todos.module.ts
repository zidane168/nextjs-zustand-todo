import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { TodosSchema } from './schemas/todos.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Todo',
        schema: TodosSchema,
      },
    ]),
  ],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}

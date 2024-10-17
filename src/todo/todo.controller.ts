import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@dataui/crud';
import { TodoEntity } from './todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './todo.dto';

@Crud({
  model: {
    type: TodoEntity,
  },
  dto: {
    create: CreateTodoDto,
  },
})
@Controller('todo')
export class TodoController implements CrudController<TodoEntity> {
  constructor(public service: TodoService) {}
}

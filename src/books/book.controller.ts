import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@dataui/crud';
import { BookEntity } from './book.entity';
import { BookService } from './book.service';
import { CreateBookDto } from './book.dto';

@Crud({
  model: {
    type: BookEntity,
  },
  dto: {
    create: CreateBookDto,
  },
})
@Controller('book')
export class BookController implements CrudController<BookEntity> {
  constructor(public service: BookService) {}
}

import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { BookEntity } from './book.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BookService extends TypeOrmCrudService<BookEntity> {
  constructor(@InjectRepository(BookEntity) repo) {
    super(repo);
  }
}

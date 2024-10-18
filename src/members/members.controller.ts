import { Controller } from '@nestjs/common';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedRequest,
} from '@dataui/crud';
import { ApiTags } from '@nestjs/swagger';
import { MembersEntity } from './members.entity';
import { CreateMembersDto, GetMemberDto } from './members.dto';
import { BookService } from 'src/books/book.service';
import { MembersService } from './members.service';

@ApiTags('Members')
@Crud({
  model: {
    type: MembersEntity,
  },
  dto: {
    create: CreateMembersDto,
  },
  routes: {
    exclude: ['updateOneBase', 'replaceOneBase', 'deleteOneBase'],
  },
  serialize: {
    get: GetMemberDto,
  },
})
@Controller('member')
export class MembersController implements CrudController<MembersEntity> {
  constructor(
    public service: MembersService,
    private bookService: BookService,
  ) {}

  get base(): CrudController<MembersEntity> {
    return this;
  }

  @Override('getManyBase')
  async getMany() {
    const members = await this.service.findWithRelations();

    const membersWithBorrowedBooksPromises = await (
      members as MembersEntity[]
    ).map(async (member) => {
      return {
        ...member,
        borrowed_books: member.borrowed_books.length,
      };
    });

    const membersWithBorrowedBooks = await Promise.all(
      membersWithBorrowedBooksPromises,
    );
    return membersWithBorrowedBooks;
  }
}

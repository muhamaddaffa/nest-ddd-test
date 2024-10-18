import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './book.entity';
import { In } from 'typeorm';
import { CrudRequest } from '@dataui/crud';
import { BorrowBookDto } from './book.dto';
import { MembersService } from 'src/members/members.service';

@Injectable()
export class BookService extends TypeOrmCrudService<BookEntity> {
  constructor(
    @InjectRepository(BookEntity) repo,
    private memberService: MembersService,
  ) {
    super(repo);
  }

  getManyByIds(ids: number[]): Promise<BookEntity[]> {
    return this.repo.findBy({
      id: In(ids),
    });
  }

  borrow(req: CrudRequest, dto: BorrowBookDto): Promise<BookEntity[]> {
    return new Promise((resolve, reject) => {
      this.memberService.getOneById(dto.borrowed_by).then((member) => {
        // validate member is not penalized
        if (member.is_penalized) {
          reject('Member is currently being penalized.');
          return [];
        }

        // validate max borrowed books at a a time
        if (dto.borrowed_books.length > 2) {
          reject('Member cannot borrow more than 2 books at a time');
          return [];
        }

        this.getManyByIds(dto.borrowed_books).then((books) => {
          //validate books are never borrowed
          books.forEach((book) => {
            if (book.is_borrowed) {
              reject(`${book.title} is currently being borrowed!`);
              return [];
            }
          });

          //validate max borrowed books
          this.count({
            where: { borrowed_by: member },
          }).then((borrowedBooksCount) => {
            if (borrowedBooksCount + dto.borrowed_books.length > 2) {
              reject('Member cannot borrow more than 2 books');
              return [];
            }

            //after all validation, update book entities
            const borrower = member;
            let updatedBooks: BookEntity[] = [];
            books.forEach((book) => {
              book.is_borrowed = true;
              book.borrowed_by = borrower;
              book.stock--;
              this.updateOne(req, book).then((updatedBook) => {
                updatedBooks.push(updatedBook);
              });
            });
            resolve(updatedBooks);
          });
        });
      });
    });
  }
}

import {
  Crud,
  CrudController,
  CrudRequest,
  CrudRequestInterceptor,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@dataui/crud';
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  UseInterceptors,
} from '@nestjs/common';
import { BookEntity } from './book.entity';
import { BookService } from './book.service';
import { ApiTags } from '@nestjs/swagger';
import { BorrowBookDto, CreateBookDto } from './book.dto';

@ApiTags('Books')
@Crud({
  model: {
    type: BookEntity,
  },
  dto: {
    create: CreateBookDto,
  },
  routes: {
    exclude: ['updateOneBase', 'replaceOneBase', 'deleteOneBase', 'getOneBase'],
  },
  query: {
    exclude: ['is_borrowed'],
  },
})
@Controller('book')
export class BookController implements CrudController<BookEntity> {
  constructor(public service: BookService) {}

  get base(): CrudController<BookEntity> {
    return this;
  }

  @UseInterceptors(CrudRequestInterceptor)
  @Patch('/borrow')
  async borrow(@ParsedRequest() req: CrudRequest, @Body() dto: BorrowBookDto) {
    try {
      const data = await this.service.borrow(req, dto);
      return {
        success: true,
        message: 'Books successfully borrowed',
        data: data,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Override('getManyBase')
  async getMany(@ParsedRequest() req: CrudRequest) {
    req.parsed.search = {
      $and: [req.parsed.search, { is_borrowed: false }],
    };
    return await this.base.getManyBase(req);
  }
}

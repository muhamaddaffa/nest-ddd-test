import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty()
  code: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  author: string;

  @ApiProperty()
  stock: number;
}
export class BorrowBookDto {
  @ApiProperty()
  borrowed_books: number[];

  @ApiProperty()
  borrowed_by: number;
}

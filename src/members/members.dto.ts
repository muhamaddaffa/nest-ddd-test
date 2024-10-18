import { ApiProperty } from '@dataui/crud/lib/crud';
import { Exclude, Expose } from 'class-transformer';

export class CreateMembersDto {
  @ApiProperty()
  code: string;

  @ApiProperty()
  name: string;
}

@Exclude()
export class GetMemberDto {
  @ApiProperty()
  @Expose()
  code: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  borrowed_books: number;
}

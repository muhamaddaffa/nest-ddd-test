import { ApiProperty } from '@nestjs/swagger';

export class CreateMembersDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  is_done: boolean;
}

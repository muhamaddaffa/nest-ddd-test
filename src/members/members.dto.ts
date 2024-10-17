import { ApiProperty } from '@nestjs/swagger';

export class CreateMembersDto {
  @ApiProperty()
  code: string;

  @ApiProperty()
  name: string;
}

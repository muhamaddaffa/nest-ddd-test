import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@dataui/crud';
import { MembersEntity } from './members.entity';
import { MembersService } from './members.service';
import { CreateMembersDto } from './members.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Members')
@Crud({
  model: {
    type: MembersEntity,
  },
  dto: {
    create: CreateMembersDto,
  },
})
@Controller('members')
export class MembersController implements CrudController<MembersEntity> {
  constructor(public service: MembersService) {}
}

import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { MembersEntity } from './members.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MembersService extends TypeOrmCrudService<MembersEntity> {
  constructor(@InjectRepository(MembersEntity) repo) {
    super(repo);
  }

  async getOneById(id: number) {
    return await this.repo.findOneByOrFail({ id });
  }

  async findWithRelations() {
    return await this.repo.find({
      relations: {
        borrowed_books: true,
      },
    });
  }
}

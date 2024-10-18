import { forwardRef, Module } from '@nestjs/common';
import { MembersEntity } from './members.entity';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { BookModule } from 'src/books/book.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([MembersEntity]),
    forwardRef(() => BookModule),
  ],
  providers: [MembersService],
  controllers: [MembersController],
  exports: [MembersService],
})
export class MembersModule {}

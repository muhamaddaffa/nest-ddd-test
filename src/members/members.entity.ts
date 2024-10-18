import { BookEntity } from 'src/books/book.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('members')
export class MembersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  is_penalized: boolean;

  @OneToMany(() => BookEntity, (book) => book.borrowed_by)
  borrowed_books: BookEntity[];

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

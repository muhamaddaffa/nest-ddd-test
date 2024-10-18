import { MembersEntity } from 'src/members/members.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('books')
export class BookEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  stock: number;

  @Column({
    type: 'boolean',
    default: false,
  })
  is_borrowed: boolean;

  @ManyToOne((type) => MembersEntity)
  @JoinColumn({ name: 'borrowed_by' })
  borrowed_by: MembersEntity;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

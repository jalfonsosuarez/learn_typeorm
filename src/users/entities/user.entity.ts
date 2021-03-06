import { ApiProperty } from '@nestjs/swagger';
import { number } from 'joi';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Task } from '../../task/entities/task.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 20, unique: true })
  username: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 50, unique: true })
  email: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  password: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  name: string;

  @OneToMany(() => Task, (tasks) => tasks.user)
  tasks: Task[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updateAt: string;
}

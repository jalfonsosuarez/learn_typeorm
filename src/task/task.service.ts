import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private usersService: UsersService,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const getUser = await this.usersService.findOne(createTaskDto.user);
    const newTask = await this.taskRepository.create({
      ...createTaskDto,
      user: getUser,
    });
    return await this.taskRepository.save(newTask);
  }

  async findAll(userId: number) {
    const getUser = await this.usersService.findOne(userId);
    return await this.taskRepository.find({
      where: { userId: getUser.id },
      relations: ['user'],
    });
  }

  async findOne(id: number) {
    const getTask = await this.taskRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!getTask) {
      throw new NotFoundException('Task not found');
    }
    return getTask;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const getTask = await this.findOne(id);
    const getUser = await this.usersService.findOne(getTask.user.id);
    const updatedTask = this.taskRepository.merge(getTask, {
      ...updateTaskDto,
      user: getUser,
    });
    return await this.taskRepository.save(updatedTask);
  }

  async remove(id: number) {
    const getTask = await this.findOne(id);
    return this.taskRepository.remove(getTask);
  }
}

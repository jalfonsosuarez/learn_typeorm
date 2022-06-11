import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTaskDto: CreateTaskDto) {
    return {
      success: true,
      task: await this.taskService.create(createTaskDto),
      mst: 'Task succesfully created!',
    };
  }

  @Get('/user/:id')
  @HttpCode(HttpStatus.OK)
  async findAll(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      tasks: await this.taskService.findAll(id),
      mst: 'Here are de user tasks!',
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      task: await this.taskService.findOne(id),
      mst: 'Here is the task!',
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return {
      success: true,
      task: await this.taskService.update(id, updateTaskDto),
      mst: 'Task succesfully updated!',
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      task: await this.taskService.remove(id),
      mst: 'Task succesfully removed!',
    };
  }
}

import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TreeLevelColumn } from 'typeorm';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    return {
      success: true,
      user: await this.usersService.create(createUserDto),
      msg: 'User created!'
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return {
      success: true,
      users: await this.usersService.findAll()
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      user: await this.usersService.findOne(id)
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return {
      success: true,
      user: await this.usersService.update(id, updateUserDto),
      msg: 'User updated successfully!'
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      user: await this.usersService.remove(id),
      msg: 'User removed successfully!'
    };
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';

// @ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new User' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: User,
    isArray: false,
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return {
      success: true,
      user: await this.usersService.create(createUserDto),
      msg: 'User created!',
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: User,
    isArray: true,
  })
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return {
      success: true,
      users: await this.usersService.findAll(),
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiQuery({ name: 'id', required: true, type: Number })
  @ApiResponse({
    status: HttpStatus.OK,
    type: User,
    isArray: false,
  })
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      user: await this.usersService.findOne(id),
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update one user by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: User,
    isArray: false,
  })
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return {
      success: true,
      user: await this.usersService.update(id, updateUserDto),
      msg: 'User updated successfully!',
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete one user by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: User,
    isArray: false,
  })
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      user: await this.usersService.remove(id),
      msg: 'User removed successfully!',
    };
  }
}

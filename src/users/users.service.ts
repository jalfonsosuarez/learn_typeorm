import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private userRepository: Repository<User>,){}


  create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    // const getUser = this.userRepository.findOne(id);
    const getUser = await this.userRepository.findOne({where: {id}});
    if(!getUser) {
      throw new NotFoundException('User not found');
    }
    return getUser;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const getUser = await this.findOne(id);
    const updatedUser = this.userRepository.merge(getUser, updateUserDto);
    return await this.userRepository.save(updatedUser);
  }

  async remove(id: number) {
    const getUser = await this.findOne(id);
    return await this.userRepository.remove(getUser);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { UserUpdate } from './dto/user-update.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(data: Partial<User>): Promise<User> {
    return this.userRepository.save(new User(data));
  }

  async findOne(where: FindOneOptions<User>): Promise<User> {
    const user = await this.userRepository.findOne(where);
    if (!user) {
      throw new NotFoundException(`There is no user with this id: ${where}`);
    }

    return user;
  }

  async update(id: number, updates: UserUpdate): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`There is no user with this id: ${id}`);
    }

    Object.assign(user, updates);
    return this.userRepository.save(user);
  }

  async registerSocialUser(socialUser) {
    return socialUser;
  }
}

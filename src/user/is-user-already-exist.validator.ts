import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { isNullOrUndefined } from 'util';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@ValidatorConstraint({ name: 'isUserAlreadyExist', async: true })
@Injectable()
export class IsUserAlreadyExist implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async validate(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ email });
    return isNullOrUndefined(user);
  }

  defaultMessage(): string {
    return `The email is already register.`;
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';

describe('UserService', () => {
  let service;
  beforeEach(async () => {
    const userRepo = new Repository<User>();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: UserService, useValue: { get: jest.fn(() => User) } },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  async create(user: Omit<User, 'id'>): Promise<User> {
    return this.userRepository.save(user);
  }

  async update(id: number, user: Omit<User, 'id'>): Promise<User> {
    const foundUser = await this.userRepository.findOneBy({ id });

    if (!foundUser) {
      throw new Error('User not found');
    }

    await this.userRepository.update(id, user);
    return this.userRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    const foundUser = await this.userRepository.findOneBy({ id });

    if (!foundUser) {
      throw new Error('User not found');
    }

    await this.userRepository.delete(id);
  }
}

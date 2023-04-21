import { Injectable } from '@nestjs/common';
import { createHmac } from 'node:crypto';
import { InjectModel } from '@nestjs/sequelize';
const { Client } = require('pg')
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll();
    return users;
  }

  async clients() {
    const client = new Client()
    await client.connect()
    const res = await client.query('SELECT * FROM c lients')
    await client.end()
    return res.rows;
  }
}

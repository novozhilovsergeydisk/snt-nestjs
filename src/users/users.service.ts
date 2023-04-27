import { Injectable } from '@nestjs/common';
import { createHmac } from 'node:crypto';
import { InjectModel } from '@nestjs/sequelize';
const { Client } = require('pg')
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User,
              private roleService: RolesService) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue('USER');
    // await user.$set('roles', [role.id]);
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({include: {all: true}});
    return users;
  }

  async getUserByEmail(email: string) {
    // const user = this.userRepository.findOne()
  }

  async clients() {
    const client = new Client()
    await client.connect()
    const res = await client.query('SELECT * FROM clients')
    await client.end()
    return res.rows;
  }
}

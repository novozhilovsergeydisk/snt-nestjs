import { Injectable } from '@nestjs/common';
import { createHmac } from 'node:crypto';
import { InjectModel } from '@nestjs/sequelize';
const { Client } = require('pg')
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { UserRolesService } from '../roles/user-roles.service';
const { Sequelize } = require('sequelize');

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User,
              private roleService: RolesService, private userRoleService: UserRolesService) {}

  async createUser(dto: CreateUserDto) {
    const db_connection = `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@localhost:${process.env.PGPORT}/${process.env.PGDATABASE}`;
    const sequelize = new Sequelize(db_connection);

    // console.log({ sequelize });

    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue('USER');
    const maxid = await this.userRoleService.getMaxId();

    console.log({ maxid });

    const userid = user.dataValues.id;
    const roleid = role.dataValues.id;
    console.log({ userid });
    console.log({ roleid });

    const sql = `INSERT INTO user_roles VALUES (${maxid}, ${userid}, ${roleid}) RETURNING *`;

    const [result, metadata] = await sequelize.query(sql);

    console.log({ result });

    // console.log({ 'metadata.rows': metadata.rows });
    //
    // console.log({ 'metadata.fields': metadata.fields });

    // console.log({ metadata });

    // await user.$set('roles', [role.id]);
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({include: {all: true}});
    return users;
  }

  async getUserByEmail(email: string) {
    const user = this.userRepository.findOne({where: {email}, include: {all: true}});
    return user;
  }

  async clients() {
    const client = new Client()
    await client.connect()
    const res = await client.query('SELECT * FROM clients')
    await client.end()
    return res.rows;
  }
}

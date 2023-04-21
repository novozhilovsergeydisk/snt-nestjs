import { Injectable } from '@nestjs/common';
import { CreateRoleDto  } from './dto/create-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { User } from '../users/user.model';

@Injectable()
export class RolesService {
  // Сюда необходимо заинжектить модель, чтобы делать записи в базу данных
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async createRole(dto: CreateRoleDto ) {

  }

  async getRoleByValue(value: string) {

  }
}

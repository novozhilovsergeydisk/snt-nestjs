import { Injectable } from '@nestjs/common';
// import { CreateRoleDto  } from './dto/create-role.dto';
import { InjectModel, SequelizeModule } from '@nestjs/sequelize';
// import { Role } from './roles.model';
// import { User } from '../users/user.model';
import { UserRoles } from './user-roles.model';
const { Sequelize } = require('sequelize');

@Injectable()
export class UserRolesService {
  // Сюда необходимо заинжектить модель, чтобы делать записи в базу данных
  constructor(@InjectModel(UserRoles) private userRoleRepository: typeof UserRoles) {}

  // async createRole(dto: CreateRoleDto ) {
  //   const role = await this.roleRepository.create(dto);
  //   return role;
  // }

  async getMaxId() {
    const db_connection = `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@localhost:${process.env.PGPORT}/${process.env.PGDATABASE}`;
    const sequelize = new Sequelize(db_connection);

    console.log({ 'SequelizeModule': SequelizeModule })

// const [result, metadata] = await sequelize.query(`select * from now()`);
    let [result] = await sequelize.query('SELECT max(id) AS maxid FROM user_roles');
    console.log({ result });

    console.log({'result[0].maxid': result[0].maxid})

    let maxid = null;
    if (result[0].maxid === null) {
      maxid = 1;
      console.log({ 'max 11': maxid });
    } else {
      console.log({ 'max 22': result[0].maxid });
      maxid = result[0].maxid + 1;
      console.log({ 'max 33': maxid });
    }

    console.log({ 'max id': maxid });

    return maxid;

    // return 42;

    // const role = await  this.roleRepository.findOne({where: {value}});
    // return role;
  }
}

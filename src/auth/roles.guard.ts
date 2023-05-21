import { CanActivate, ExecutionContext, Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles-auth.decorator';
import { UsersService } from '../users/users.service';
const { Client } = require('pg');
const { Sequelize } = require('sequelize');

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService,
              private reflector: Reflector,
              private userService: UsersService) {
  }

  async __users() {
    const client = new Client()
    await client.connect()
    const res = await client.query('SELECT * FROM __users')
    await client.end()
    return res.rows;
  }

  // zxc(@Res() res: Response): void {
  //   console.log('res')
  // }

  async test() {
    const client = new Client()
    await client.connect()

    // const db_connection = `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@localhost:${process.env.PGPORT}/${process.env.PGDATABASE}`;
    // const sequelize = new Sequelize(db_connection);
    const sql = `
        SELECT 
          "users"."value" AS "users_roles"
          --"User"."id", "User"."email", "User"."password", "User"."banned", "User"."banReason", "User"."createdAt", "User"."updatedAt", "users"."id" AS "users.id", "users"."value" AS "users.value", "users"."description" AS "users.description", "users"."createdAt" AS "users.createdAt", "users"."updatedAt" AS "users.updatedAt", "users->UserRoles"."id" AS "users.UserRoles.id", "users->UserRoles"."userId" AS "users.UserRoles.userId", "users->UserRoles"."roleId" AS "users.UserRoles.roleId" 
        FROM 
          "__users" AS "User" 
        LEFT OUTER JOIN 
          ( "user_roles" AS "users->UserRoles" 
        INNER JOIN 
          "__roles" AS "users" ON "users"."id" = "users->UserRoles"."roleId") ON "User"."id" = "users->UserRoles"."userId" 
        WHERE 
          "User"."email" = 'admin1';
        ;`;

    const res = await client.query(sql);
    await client.end();
    return res.rows;

    // const re = await sequelize.query(sql);
    //
    // return re;
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const db_connection = `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@localhost:${process.env.PGPORT}/${process.env.PGDATABASE}`;
      const sequelize = new Sequelize(db_connection);

      const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

      console.log({ 'context.getClass()': context.getClass() })
      console.log({ 'context.getHandler()': context.getHandler()})
      console.log({ requiredRoles })

      if (!requiredRoles) {
        return true;
      }

      const roles = this.reflector.get('roles', context.getHandler());

      if (!roles) {
        return true;
      }

      const request = context.switchToHttp().getRequest();
      const _user = request.user;

      console.log({ roles })

      console.log({ '_user.roles': _user })

      // return matchRoles(roles, _user.roles);

      const req = context.switchToHttp().getRequest()
      const authHeader = req.headers.authorization;

      console.log({ authHeader })

      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer != 'Bearer' || !token) {
        throw new UnauthorizedException({ status: 'failed', message: 'Пользователь не авторизован 11' })

      }

      const user = this.jwtService.verify(token);
      console.log({ 'user': user });
      // req.user = user;

      const xxx = this.userService.getAllUsers();

      // return xxx;

      console.log({ xxx })

      // return user.id.some(id => requiredRoles.includes(17));

      const sql = `
        SELECT 
          "users"."value" AS "users_roles"
          --"User"."id", "User"."email", "User"."password", "User"."banned", "User"."banReason", "User"."createdAt", "User"."updatedAt", "users"."id" AS "users.id", "users"."value" AS "users.value", "users"."description" AS "users.description", "users"."createdAt" AS "users.createdAt", "users"."updatedAt" AS "users.updatedAt", "users->UserRoles"."id" AS "users.UserRoles.id", "users->UserRoles"."userId" AS "users.UserRoles.userId", "users->UserRoles"."roleId" AS "users.UserRoles.roleId" 
        FROM 
          "__users" AS "User" 
        LEFT OUTER JOIN 
          ( "user_roles" AS "users->UserRoles" 
        INNER JOIN 
          "__roles" AS "users" ON "users"."id" = "users->UserRoles"."roleId") ON "User"."id" = "users->UserRoles"."userId" 
        WHERE 
          "User"."email" = 'admin1';
        ;`;

      const re = sequelize.query(sql);

      const test = this.test();

      console.log({ test });

      const users = this.__users();

      console.log({ users });

      const r = this.test();

      console.log({ r });

      return re;

      // return true;

      // console.log({ 'role.value': role.value });
      //
      // const zxc = user.roles.some(role => requiredRoles.includes(role.value));
      //
      // console.log({ zxc })
      //
      // return user.roles.some(role => requiredRoles.includes(role.value));

    } catch (e) {
      console.log({ e })
      throw new UnauthorizedException({status: 'failed', message: 'Пользователь не авторизован 22'})
    }
  }
}

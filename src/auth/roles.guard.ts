import { CanActivate, ExecutionContext, Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles-auth.decorator';
const { Client } = require('pg')

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService,
              private reflector: Reflector) {
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

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      if (!requiredRoles) {
        return true;
      }

      const req = context.switchToHttp().getRequest()
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer != 'Bearer' || !token) {
        throw new UnauthorizedException({ status: 'failed', message: 'Пользователь не авторизован' })

      }

      const user = this.jwtService.verify(token);
      console.log({ user });
      req.user = user;

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
          "User"."email" = 'test@mail.ru';
        ;`;

      const users = this.__users();

      console.log({ users });

      return true;

      // return user.roles.some(role => requiredRoles.include(role.value));
    } catch (e) {
      console.log({ e })
      throw new UnauthorizedException({status: 'failed', message: 'Пользователь не авторизован'})
    }
  }
}

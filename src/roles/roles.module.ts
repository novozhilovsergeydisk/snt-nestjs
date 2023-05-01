import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { User } from '../users/user.model';
import { UserRoles } from './user-roles.model';
import { UserRolesService } from './user-roles.service';


@Module({
  providers: [RolesService, UserRolesService],
  controllers: [RolesController],
  imports: [
    SequelizeModule.forFeature([Role, User, UserRoles])
  ],
  exports: [
    RolesService,
    UserRolesService
  ]
})
export class RolesModule {}

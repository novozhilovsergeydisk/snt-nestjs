import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UserRolesService } from './user-roles.service';

@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService, private userRoleService: UserRolesService) {}

  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.createRole(dto);
  }

  // Чтобы этот value вытащить, необходим декоратор @Param
  @Get('/:value')
  getByValue(@Param('value') value: string) {
    return this.roleService.getRoleByValue(value);
  }

  @Get('/:user-role')
  getMaxId() {
    return this.userRoleService.getMaxId();
  }

}

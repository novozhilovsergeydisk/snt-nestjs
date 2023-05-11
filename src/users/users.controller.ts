import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './user.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';


@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({summary: 'Создание пользователя'})
  @ApiResponse({status: 200, type: User})
  @Post()
  createUsers (@Body() userDto: CreateUserDto) {
    console.log({ userDto })

    return this.usersService.createUser(userDto);

    // userService.clients();

  }

  @ApiOperation({summary: 'Получить всех пользователей'})
  @ApiResponse({status: 200, type: [User]})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  // @UseGuards(JwtAuthGuard)
  getAll() {
    // return {foo: 'bar'};
    return this.usersService.getAllUsers();
  }
}

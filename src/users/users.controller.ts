import { Body, Controller, Post, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';


@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  createUsers (@Body() userDto: CreateUserDto) {
    console.log({ userDto })

    return this.usersService.createUser(userDto);

    // userService.clients();

  }

  @Get()
  getAll() {
    // return {foo: 'bar'};
    return this.usersService.getAllUsers();
  }
}

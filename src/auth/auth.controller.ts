import { Body, Controller, Get, Post, Render, Redirect } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/foo')
  @Redirect('/', 301)
  foo(): void {
    console.log('foo');
    return;
    // res.redirect('/login');
  }

  @Get('/login')
  @Render('admin/index-login.ejs')
  formLogin() {
    return { title: 'Тест', content: '' };
  }

  @Post('/login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto)
  }

  @Post('/register')
  register(@Body() userDto: CreateUserDto) {
    return this.authService.register(userDto)
  }
}

import { Get, Controller, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('admin')
  @Render('admin/index.ejs')
  index() {
    return { title: 'Тест', content: '' };
  }

  @Get('admin/default')
  @Render('admin/default.ejs')
  default() {
    return { title: 'Тест', content: '' };
  }

  @Get('/')
  @Render('site/main.ejs')
  main() {
    return { title: 'ТСН СНТ Загорье', content: '' };
  }

  @Get('bulletin-board')
  @Render('site/bulletin-board.ejs')
  bulletin_board() {
    return { title: 'О нас', content: '' };
  }

  @Get('contacts')
  @Render('site/contacts.ejs')
  contacts() {
    return { title: 'Контакты', content: '' };
  }

  @Get('select')
  select() {
    const res = this.appService.select();
    return res;
  }
}

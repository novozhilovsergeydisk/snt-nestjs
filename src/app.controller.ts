import { Get, Controller, Render } from '@nestjs/common';
import { AppService } from './app.service';
import * as fs from "fs";
// import { readFile, set_fs } from "xlsx";
// set_fs(fs);

import * as xlsx from 'xlsx';

console.log(xlsx.readFile);

// console.log({ set_fs });

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

  @Get('admin/xlsx')
  @Render('admin/xlsx.ejs')
  xlsx() {
    return { title: 'XLSX', content: {} }
  }

  @Get('admin/upload-xlsx')
  upload_xlsx() {
    const wb = xlsx.readFile('./new-upload.xlsx');
    const ws = wb.Sheets['TDSheet'];
    const data = xlsx.utils.sheet_to_json(ws, { raw: false });

  

    // console.log(ws);

    for (let k in data) {

      // const data__ = data[k];
      //
      // Object.entries(data__).forEach((entry) => {
      //   const [key, value] = entry;
      //   console.log(key + ':' + k +': ' + value);
      // });

      // console.log(data__)

      // for (let k in data__) {
      //   console.log(k + ': ' + data__[k]);
      // }

      // console.log(data[1070]);

      // console.log(k + ': ' + data[k]);
    }

    // console.log(ws);

    // console.log( data[k] );

    return 'upload_xlsx()';
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

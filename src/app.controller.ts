import { Get, Controller, Render, UseGuards, SetMetadata } from '@nestjs/common';
import { AppService } from './app.service';
import * as fs from "fs";
// import { readFile, set_fs } from "xlsx";
// set_fs(fs);

import * as xlsx from 'xlsx';
import { forEachResolvedProjectReference } from 'ts-loader/dist/instances';

import * as crypto from 'crypto';
import { Roles } from './auth/roles-auth.decorator';
import { RolesGuard } from './auth/roles.guard';

// console.log(xlsx.readFile);

// console.log({ set_fs });

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // admin zone

  @Roles('ADMIN')
  @SetMetadata('roles', ['admin'])
  // @UseGuards(RolesGuard)
  @Get('user/index')
  @Render('admin/index.ejs')
  index() {
    return { _title: 'Тест', _content: '', redirect: '' };
  }

  @Roles('USER')
  @SetMetadata('roles', ['admin'])
  // @UseGuards(RolesGuard)
  @Get('user/regulation-snt')
  @Render('admin/regulation-snt.ejs')
  regulationSnt() {
    return { _title: 'regulationSnt()', _content: '', redirect: '' };
  }

  @Get('user/accounting-documents')
  @Render('admin/accounting-documents.ejs')
  accounting_documents() {
    return { _title: 'foo', _content: 'bar' };
  }

  @Get('admin/xlsx')
  @Render('admin/xlsx.ejs')
  xlsx() {
    return { title: 'XLSX', content: {} }
  }

  @Get('admin/upload-xlsx')
  upload_xlsx() {
//  If you are using CommonJS, you can use the following "require"
// const crypto = require('crypto');

    const randomString1 = crypto.randomBytes(4).toString('hex');
    console.log(randomString1);

    const randomString2 = crypto.randomBytes(8).toString('hex');
    console.log(randomString2);

    const randomString3 = crypto.randomBytes(16).toString('hex');
    console.log(randomString3);

    function isString(val) {
      return (typeof val === "string" || val instanceof String);
    }

    const parse = (filename) => {
      const excelData = xlsx.readFile(filename);

      return Object.keys(excelData.Sheets).map((name) => ({
        name,
        data: xlsx.utils.sheet_to_json(excelData.Sheets[name]),
      }));
    };
    const res = parse('./upload-list.xlsx');

    // console.log(res);

    parse('./upload-list.xlsx').forEach(element => {
      // console.log(element.data[0]);

      // if (element.name = 'UploadList') {
      //   const el = element.data[5];
      //   console.log(el['__EMPTY']);
      // }

      // console.log(element.name);
    });

    const wb = xlsx.readFile('./clients.xlsx');
    const ws = wb.Sheets['TDSheet'];
    const data = xlsx.utils.sheet_to_json(ws);
    // const cell = data[6]['ТСН СНТ "ЗАГОРЬЕ"'];

    // console.log(isString(cell))
    //
    // console.log(data[6]['ТСН СНТ "ЗАГОРЬЕ"']);

    // console.log(data);

    // let result = {};

    let clientData = {};
    let __plot__ = '';
    let __fio__ = '';

    for (let k in data) {

      // const isNumber = Number.isInteger(Number(k));
      //
      // console.log({ isNumber })

      if (Number(k) < 5) continue;

      // const data__ = data[k];
      //
      // Object.entries(data__).forEach((entry) => {
      //   const [key, value] = entry;
      //   console.log(key + ':' + k +': ' + value);
      // });

      // console.log(__fio__)

      // for (let k in data__) {
      //   console.log(k + ': ' + data__[k]);
      // }

      // console.log(data[1070]);

      const subject = data[k]['Subject'];
      // const isNumber = Number.isInteger(cell);
      const fio = data[k]['Name'];
      const accrued = data[k]['Accrued'];
      const paid = data[k]['Paid'];
      const debt = data[k]['Debt'];
      const overpayment = data[k]['Overpayment'];

      if (fio !== undefined) {
        __fio__ = fio;
        __plot__ = subject;
        // result[k] = { plot: subject, fio };
        // result['fio'] = fio;
        // console.log({ fio });
      }

      // console.log({ __fio__ })

      if (subject !== 'Итого') {
        let data = { id: k, __plot__, __fio__, subject, accrued, paid, debt, overpayment };
        const uuid = crypto.randomBytes(16).toString('hex');

        // console.log(typeof uuid);

        clientData[uuid] = data;

        // clientData[k] = { __fio__, subject, accrued, paid, debt, overpayment };

        // console.log(k);
        // console.log({ subject });
        // console.log({ fio });
        // console.log({ accrued });
        // console.log({ paid });
        // console.log({ debt });
        // console.log({ overpayment });
        // console.log({ isNumber });
        // console.log('-------------------------------------');
      } else {
        console.log({ clientData });

        console.log(subject + ' : ' + accrued + ' руб. начислено, ' + paid + ' руб. оплачено, ' + debt + ' руб. долг, ' + overpayment + ' руб. переплата.');
      }
    }



    // console.log(ws);

    // console.log( data[k] );

    return 'upload_xlsx()';
  }

  @Get('admin/default')
  @Render('admin/default.ejs')
  default() {
    return { title: 'Тест', content: '' };
  }

  // site zone

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

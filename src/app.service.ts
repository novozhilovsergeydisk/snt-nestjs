import { Injectable } from '@nestjs/common';
const { Client } = require('pg')

@Injectable()
export class AppService {
  stub(): string {
    return 'Hello World!';
  }

  async select() {
    const client = new Client()
    await client.connect()

    const res = await client.query('SELECT * FROM test')

    // const res = await client.query('SELECT $1::text as message', ['Hello world!'])
    // console.log(res.rows[0].message) // Hello world!

    await client.end()

    // console.log({ 'res = ': res.rows })

    return res.rows;
  }
}

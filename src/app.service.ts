import { Injectable } from '@nestjs/common';
const { Client } = require('pg')

@Injectable()
export class AppService {
  stub(): string {
    return 'Hello World!';
  }

  async clients() {
    const client = new Client()
    await client.connect()
    const res = await client.query('SELECT * FROM clients')
    await client.end()
    return res.rows;
  }

  async users() {
    const client = new Client()
    await client.connect()
    const res = await client.query('SELECT * FROM users')
    await client.end()
    return res.rows;
  }

  async aef() {
    const client = new Client()
    await client.connect()
    const res = await client.query('SELECT * FROM aef')
    await client.end()
    return res.rows;
  }

  async billboard() {
    const client = new Client()
    await client.connect()
    const res = await client.query('SELECT * FROM billboard')
    await client.end()
    return res.rows;
  }

  async dealings() {
    const client = new Client()
    await client.connect()
    const res = await client.query('SELECT * FROM dealings')
    await client.end()
    return res.rows;
  }

  async electroCounterList() {
    const client = new Client()
    await client.connect()
    const res = await client.query('SELECT * FROM electro_counter_list')
    await client.end()
    return res.rows;
  }

  // test methods

  async select() {
    const client = new Client()
    await client.connect()

    const res = await client.query('SELECT * FROM clients')

    // const res = await client.query('SELECT $1::text as message', ['Hello world!'])
    // console.log(res.rows[0].message) // Hello world!

    await client.end()

    // console.log({ 'res = ': res.rows })

    return res.rows;
  }
}

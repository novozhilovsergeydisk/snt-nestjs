import { Body, HttpException, HttpStatus, Injectable, Post } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { User } from '../users/user.model';









import { scrypt, randomBytes, timingSafeEqual } from "crypto";

const keyLength = 32;
/**
 * Has a password or a secret with a password hashing algorithm (scrypt)
 * @param {string} password
 * @returns {string} The salt+hash
 */
export const hash__ = async (password, salt) => {
  return new Promise((resolve, reject) => {
    // generate random 16 bytes long salt - recommended by NodeJS Docs
    // const salt = randomBytes(16).toString("hex");

    scrypt(password, salt, keyLength, (err, derivedKey) => {
      if (err) reject(err);
      // derivedKey is of type Buffer
      resolve(`${salt}.${derivedKey.toString("hex")}`);
    });
  });
};

/**
 * Compare a plain text password with a salt+hash password
 * @param {string} password The plain text password
 * @param {string} hash The hash+salt to check against
 * @returns {boolean}
 */
export const compare__ = async (password, hash) => {
  return new Promise((resolve, reject) => {
    const [salt, hashKey] = hash.split(".");
    // we need to pass buffer values to timingSafeEqual
    const hashKeyBuff = Buffer.from(hashKey, "hex");
    scrypt(password, salt, keyLength, (err, derivedKey) => {
      if (err) reject(err);
      // compare the new supplied password with the hashed password using timeSafeEqual
      resolve(timingSafeEqual(hashKeyBuff, derivedKey));
    });
  });
};

(async function run__ () {
  const password1 = await hash__("123456", process.env.SECRET || 'test2')
  const password2 = await hash__("123456", process.env.SECRET || 'test3')
  console.log({ password1 })
  console.log({ password2 })
  console.log("password1", await compare__("123456", password1));
  console.log("password2", await compare__("123456", password2));
  console.log("password1 == password2", password1 == password2);
})()









async function hash(password, salt) {
  return new Promise((resolve, reject) => {
    // generate random 16 bytes long salt
    // const salt = crypto.randomBytes(16).toString("hex")
    // const salt = '089ccdff2130d1912eb30a7f6533a247'; // (process.env.SECRET).toString();

    crypto.randomBytes(16).toString("hex")
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(salt + ":" + derivedKey.toString('hex'))
    });
  })
}

async function verify(password, hash) {
  return new Promise((resolve, reject) => {
    const [salt, key] = hash.split(":")
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(key == derivedKey.toString('hex'))
    });
  })
}

(async function run () {
  const password1 = await hash("123456", process.env.SECRET || 'test')
  const password2 = await hash("123456", process.env.SECRET || 'test')
  console.log({ password1 })
  console.log({ password2 })
  console.log("password1", await verify("123456", password1));
  console.log("password2", await verify("123456", password2));
  console.log("password1 == password2", password1 == password2);
})



const algorithm = 'aes-256-ctr'
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3'

const encrypt = text => {
  const iv = crypto.randomBytes(16)

  const cipher = crypto.createCipheriv(algorithm, secretKey, iv)

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()])

  return {
    iv: iv.toString('hex'),
    content: encrypted.toString('hex')
  }
}

const decrypt = hash => {
  const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'))

  const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()])

  return decrpyted.toString()
}



const { Sequelize } = require('sequelize');

@Injectable()
export class AuthService {

  constructor(private userService: UsersService,
              private jwtService: JwtService) {

  }

  async login(userDto: CreateUserDto) {
         const user = await this.validateUser(userDto);
         return this.generateToken(user);
  }

  async register(userDto: CreateUserDto) {
    const db_connection = `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@localhost:${process.env.PGPORT}/${process.env.PGDATABASE}`;
    const sequelize = new Sequelize(db_connection);

    let [result] = await sequelize.query('SELECT max(id) AS maxid FROM user_roles');
    console.log({ result });

    // throw new HttpException('test', HttpStatus.BAD_REQUEST);

    const candidate = await this.userService.getUserByEmail(userDto.email);

    if (candidate) {
      throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST);
    }
    const hashPassword = crypto.randomBytes(16).toString('hex');
    console.log({ hashPassword });
    const user = await this.userService.createUser({ ...userDto, password: hashPassword });


    return this.generateToken(user);

    // return hashPassword;
  }

  async generateToken(user: User) {
    const payload = { email: user.email, id: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    const password1 = userDto.password;
    const password2 = user.password;

    const hash = encrypt(password1)

    console.log({ hash });

// {
//     iv: '237f306841bd23a418878792252ff6c8',
//     content: 'e2da5c6073dd978991d8c7cd'
// }

    const text = decrypt(password2)

    console.log({ text }) // Hello World!

    console.log({ password1 });
    console.log({ password2 });

    // const resultHash = this.compareHashPassword(password1, password2);
    // console.log({ resultHash })

    return user;
  }

}

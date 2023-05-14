import { Body, HttpException, HttpStatus, Injectable, Post, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { User } from '../users/user.model';

const algorithm = 'aes-256-ctr';
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';

const encrypt = text => {
  // console.log({ secretKey })

  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  // return {
  //   iv: iv.toString('hex'),
  //   content: encrypted.toString('hex')
  // }

  return iv.toString('hex') + ':' + encrypted.toString('hex');
};

const decrypt = hash => {
  const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));

  // console.log({ 'hash.content': hash.content });

  const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);

  return decrpyted.toString();
};

const { Sequelize } = require('sequelize');

@Injectable()
export class AuthService {

  constructor(private userService: UsersService,
              private jwtService: JwtService) {

  }

  async login(userDto: CreateUserDto) {
    await this.checkEmptyFields(userDto);

    const user = await this.validateUser(userDto);

    return this.generateToken(user);
  }

  async register(userDto: CreateUserDto) {
    if (!userDto.email) {
      throw new HttpException('Заполните поле Email', HttpStatus.BAD_REQUEST);
    }

    if (!userDto.password) {
      throw new HttpException('Заполните поле Пароль', HttpStatus.BAD_REQUEST);
    }

    const db_connection = `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@localhost:${process.env.PGPORT}/${process.env.PGDATABASE}`;
    const sequelize = new Sequelize(db_connection);

    let [result] = await sequelize.query('SELECT max(id) AS maxid FROM user_roles');
    console.log({ result });

    const candidate = await this.userService.getUserByEmail(userDto.email);

    if (candidate) {
      throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = encrypt(userDto.password); // crypto.randomBytes(16).toString('hex');
    console.log({ hashPassword });
    const user = await this.userService.createUser({ ...userDto, password: hashPassword });

    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async checkEmptyFields(userDto: CreateUserDto) {
    if (!userDto.email) {
      throw new HttpException('Заполните поле Email', HttpStatus.BAD_REQUEST);
    }

      if (!userDto.password) {
        throw new HttpException('Заполните поле Пароль', HttpStatus.BAD_REQUEST);
      }

    // try {
    //   if (!userDto.email) {
    //     throw new HttpException('Заполните поле Email', HttpStatus.BAD_REQUEST);
    //   }
    //
    //   if (!userDto.password) {
    //     throw new HttpException('Заполните поле Пароль', HttpStatus.BAD_REQUEST);
    //   }
    // } catch (e) {
    //   // console.log({ 'err': e });
    //   throw new HttpException('Заполните поля Email и пароль.', HttpStatus.BAD_REQUEST);
    // }
  }

  private async validateUser(userDto: CreateUserDto) {
    try {
      // if (!userDto.email) {
      //   throw new HttpException('Заполните поле Email', HttpStatus.BAD_REQUEST);
      // }
      //
      // if (!userDto.password) {
      //   throw new HttpException('Заполните поле Пароль', HttpStatus.BAD_REQUEST);
      // }

      const user = await this.userService.getUserByEmail(userDto.email);

      const userDtoPassword = userDto.password;

      const userPassword = user.password;

      // const hash = encrypt(userDtoPassword);

      const result = userPassword.split(':', 2);

      const hashUser = { iv: result[0], content: result[1] };

      const passUser = decrypt(hashUser);

      console.log({ userDtoPassword });
      console.log({ passUser });

      if (user && (userDtoPassword === passUser)) {
        console.log('Belissimo!');
        return user;
      }

      // throw new HttpException('Некорректный email или пароль', HttpStatus.BAD_REQUEST)

      throw new UnauthorizedException({ message: 'Некорректный email или пароль' });

      // const resultHash = this.compareHashPassword(password1, password2);
      // console.log({ resultHash })
    } catch (e) {
      console.log({ 'err': e });

      throw new HttpException('Ошибка валидации. Некорректный email или пароль.', HttpStatus.UNAUTHORIZED);
    }
  }

}

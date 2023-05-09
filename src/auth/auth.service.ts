import { Body, HttpException, HttpStatus, Injectable, Post, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { User } from '../users/user.model';

const algorithm = 'aes-256-ctr'
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3'

const encrypt = text => {
  console.log({ secretKey })

  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  // return {
  //   iv: iv.toString('hex'),
  //   content: encrypted.toString('hex')
  // }

  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

const decrypt = hash => {
  const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));

  const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);

  return decrpyted.toString();
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
    const hashPassword = encrypt(userDto.password) // crypto.randomBytes(16).toString('hex');
    console.log({ hashPassword });
    const user = await this.userService.createUser({ ...userDto, password: hashPassword });

    // userDto['password'] = '786579';

    console.log({ userDto });

    return this.generateToken(user);

    // return hashPassword;
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);

    const userDtoPassword = userDto.password;
    const userPassword = user.password;

    console.log({ userDtoPassword });

    console.log({ userPassword });

    const hash = encrypt(userDtoPassword)

    console.log({ hash });

    // console.log('11');

    const result = userPassword.split(':', 2);

    const hashUser =  { iv: result[0], content: result[1] };

    console.log({ result });

    console.log({ hashUser });

    const passUser = decrypt(hashUser);

    // console.log('22');

    console.log({ passUser });

    // console.log({ password1 });
    // console.log({ password2 });

    if (user && (userDtoPassword === passUser)) {
      console.log('Belissimo!')
      return user;
    }

    throw new UnauthorizedException({message: 'Некорректный email или пароль'})

    // const resultHash = this.compareHashPassword(password1, password2);
    // console.log({ resultHash })

  }

}

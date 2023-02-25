import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
// import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    // SequelizeModule.forRoot({
    //   dialect: 'postgres',
    //   host: process.env.PGHOST,
    //   port: Number(process.env.PGPORT),
    //   username: process.env.PGUSER,
    //   password: process.env.PGPASSWORD,
    //   database: process.env.PGDATABASE,
    //   models: [],
    //   autoLoadModels: true
    // })
  ],
})
export class AppModule {}

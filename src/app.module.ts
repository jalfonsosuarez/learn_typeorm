import { Module } from '@nestjs/common';
import { ConfigModule, ConfigObject } from '@nestjs/config';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config';
import { DatabaseModule } from './database.module';
import { UsersModule } from './users/users.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [config],
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
      })
    }),
    DatabaseModule,
    UsersModule,
    TaskModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

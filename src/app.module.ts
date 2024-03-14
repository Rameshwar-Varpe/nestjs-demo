import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user';
import { Profile } from './user/entities/profile';
import { Post } from './user/entities/post';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot({
    type: 'mysql',
    port: 3306,
    host: 'localhost',
    username: 'root',
    password: 'root',
    database: 'user_db',
    entities: [User, Profile, Post],
    synchronize: true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
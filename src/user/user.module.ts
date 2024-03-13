import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user';
import { Profile } from './entities/profile';

@Module({
  imports:[TypeOrmModule.forFeature([User, Profile])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}

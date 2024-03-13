import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { CreateUserProfileDto } from './dto/CreateUserProfile.dto';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    // @Get()
    // getUserById(@Param('id') id: number) {
    //     return this.userService.getUserById(id);
    // }

    @Get()
    getUsers() {
        return this.userService.findUsers();
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }

    @Patch(':id')
    async updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto
    ) {
        await this.userService.updateUser(id, updateUserDto)
    }

    @Delete(':id')
    async deleteUser(
        @Param('id', ParseIntPipe) id: number) {
        await this.userService.deleteUser(id)
    }

    @Post(':id/profiles')
    createUserProfile(@Param('id', ParseIntPipe) id: number,
        @Body() createUserProfileDto: CreateUserProfileDto) {
            return this.userService.createUserProfile(id,createUserProfileDto)
    }
}

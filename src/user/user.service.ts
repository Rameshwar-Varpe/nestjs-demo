import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/user';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserParams, CreateUserPostParams, UpdateUserParams, createUserProfileParams } from './utils/types';
import { Profile } from './entities/profile';
import { Post } from './entities/post';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Profile) private profileRepository: Repository<Profile>,
        @InjectRepository(Post) private postRepository: Repository<Post>,) { }

    // getUserById(id: number): Promise<User | undefined> {
    //     return this.userRepository.findOne({ id }); 
    //   }

    findUsers() {
        return this.userRepository.find({ relations: ['profile', 'posts'] });
    }

    createUser(userDetails: CreateUserParams) {
        const newUser = this.userRepository.create({
            ...userDetails,
            // createdAt: new Date()
        });

        return this.userRepository.save(newUser);
    }

    updateUser(id: number, updateUserDetails: UpdateUserParams) {
        return this.userRepository.update({ id }, { ...updateUserDetails });
    }

    deleteUser(id: number) {
        return this.userRepository.delete(id)
    }

    getOneUser(id: number) {
        return this.userRepository.findOneBy({ id });
    }

    async createUserProfile(id: number, createUserProfileDetails: createUserProfileParams) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user)
            throw new HttpException(
                'User Not Found. Cannot create Profile', HttpStatus.BAD_REQUEST,
            );
        const newProfile = this.profileRepository.create(createUserProfileDetails);
        const savedProfile = await this.profileRepository.save(newProfile)
        user.profile = savedProfile;
        return this.userRepository.save(user);
    }

    async createUserPost(id: number, createUserDetails: CreateUserPostParams) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user)
            throw new HttpException(
                'User Not Found. Cannot create Profile', HttpStatus.BAD_REQUEST,
            );
        const newPost = this.postRepository.create({
            ...createUserDetails,
            user
        });
        return await this.postRepository.save(newPost);
    }
}
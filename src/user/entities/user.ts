import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./profile";
import { Post } from "./post";

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn({type:'bigint'})
    id: number;

    @Column({ unique: true , nullable : false})
    username: string;

    @Column()
    password: string;

    @OneToOne(() => Profile)
    @JoinColumn()
    profile : Profile;
    
    @OneToMany(() => Post , (post) => post.user)
    posts : Post[]
}
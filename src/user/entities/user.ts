import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./profile";

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
    
}
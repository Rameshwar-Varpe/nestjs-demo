export type CreateUserParams = {
    username : string;
    password : string;
}

export class UpdateUserParams {
    username: string;
    password: string;
}

export class createUserProfileParams{
    firstName: string;
    lastName: string;
    age: number;
    dob: string;
}
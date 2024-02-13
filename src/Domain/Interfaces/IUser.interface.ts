export interface IUserUpdateDto{
    name:string,
    username:string,
    mail:string,
    password:string
}

export interface IUserDto{
    name: string;
    email:string;
    age:string;
    role:string;
}

export interface IUserLoginDto{
    username:string,
    password:string
}
export interface IUserLoginDto{
    email:string,
    password:string
}

export interface IUserUpdateDto{
    name: string;
    age:number | any;
    password:string;
}
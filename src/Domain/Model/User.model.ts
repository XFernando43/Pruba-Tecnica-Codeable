export class User {
    id: number;
    name: string;
    email:string;
    age:number | any;
    role:string;
    password?:string;
}

export type UserData = Omit<User, "id">;

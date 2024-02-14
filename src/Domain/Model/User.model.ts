export class User {
    id: number;
    name: string;
    email:string;
    age:number;
    role:string;
}

export type UserData = Omit<User, "id">;

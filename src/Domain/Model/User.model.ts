export class User {
    id: number;
    name: string;
    email:string;
    age:string;
    // password:string;
    role:string;
}

export type UserData = Omit<User, "id">;

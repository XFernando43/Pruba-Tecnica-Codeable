export class User {
    id: number;
    name: string;
    email:string;
    age:string;
    role:string;
}

export type UserData = Omit<User, "id">;

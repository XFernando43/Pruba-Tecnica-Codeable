import type { User, UserData } from '../../Domain/Model/user.model';
import { query } from '../../Db';

export async function registerUser(data: UserData):Promise<User|string>{
    const existingUser = await getUserByName(data.name);
    if (existingUser) {
        return "Usuarname ya utilizado";
    }else{ 
      const _query = "INSERT INTO users(name,email,age,role) VALUES($1,$2,$3,$4) RETURNING *"
      const queryParams = [ data.name,data.email,data.age,data.role];
      const result = await query(_query,queryParams);
      return result.rows[0];
    }
}

export async function getAllUsers():Promise<User[]>{
    const _query = "Select* from Users"
    const result = await query(_query);
    return result.rows;
}

export async function getUserById(id:string):Promise<User>{
  let _query = `Select* From users where id = ${id}`;
  const result = await query(_query);
  return result.rows[0];
}

export async function getUserByName(username: string): Promise<User> {
    const consult = `SELECT * FROM users WHERE name = $1`;
    const result = await query(consult, [username]);
    return result.rows[0];
}

export async function deleteUsername(userId:string):Promise<User>{
  const consult = `Delete from users where id = ${userId} RETURNING *;`;
    const result = await query(consult);
    return result.rows[0];
}

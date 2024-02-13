import jwt from 'jsonwebtoken';
const bcrypt = require("bcryptjs");
import type { User, UserData } from '../../Domain/Model/user.model';
import { query } from '../../Db';
import "dotenv/config";
import type { IUserLoginDto, IUserUpdateDto } from "../../Domain/Interfaces/IUser.interface";
const jwtSecret = process.env["JWTSECRET"];



// export async function registerUser(data: UserData):Promise<User|string>{
//     const existingUser = await getUserByName(data.name);
//     if (existingUser) {
//         return "Usuarname ya utilizado";
//     }else{ 
//       const hashedPassword = await bcrypt.hash(data.password, 10);
//       const _query = "INSERT INTO users(name,username,password,role) VALUES($1,$2,$3,$4) RETURNING *"
//       const queryParams = [ data.name,data.username,hashedPassword,data.role];
      
//       const result = await query(_query,queryParams);
//       return result.rows[0];
//     }
// }

export async function UpdateUsernameById(id:string,data:IUserUpdateDto): Promise<User>{

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const _query = `
      UPDATE users 
      SET name = $1, username = $2, password = $3, mail = $4
      WHERE user_id = $5
      RETURNING *;
  
      `;  
  const queryParams = [data.name, data.username, hashedPassword, data.mail,id];
  const result = await query(_query, queryParams);
  return result.rows[0];
}

export async function getAllUsers():Promise<User[]>{
    const _query = "Select* from Users"
    const result = await query(_query);
    return result.rows;
}

export async function getUserById(id:string):Promise<User>{
  let _query = `Select* From users where user_id = ${id}`;
  const result = await query(_query);
  return result.rows[0];
}

export async function getUserByName(username: string): Promise<User> {
    const consult = `SELECT * FROM users WHERE username = $1`;
    const result = await query(consult, [username]);
    return result.rows[0];
}

export async function deleteUsername(userId:string):Promise<User>{
  const consult = `Delete from users where user_id = ${userId} RETURNING *;`;
    const result = await query(consult);
    return result.rows[0];
}

// export async function Login(data:IUserLoginDto){
//     const userFromBb = await getUserByName(data.username);

//     if(userFromBb === undefined){
//       return {
//         ok: false,
//         message: "Usuario no encontrado",
//       };
//     }

//     const checkPassword = await bcrypt.compare(
//       data.password,
//       userFromBb.password
//     );
    
//     console.log("-->: ",userFromBb);
//     console.log("-->: ",userFromBb.user_id);
//     console.log("-->: ",userFromBb.role);
    
//     const payload = {
//       userId: userFromBb.user_id,
//       userRole: userFromBb.role,
//     };
//     const token = jwt.sign(payload, jwtSecret as string, { expiresIn: "50m" });

//     if (checkPassword) {
//       const data = {
//         ok: true,
//         user: userFromBb,
//         token: token,
//       };
//       return data;
//     } else {
//       return {
//         ok: false,
//         message: "Error",
//       };
//     }
// }

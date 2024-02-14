import "dotenv/config";
import jwt from 'jsonwebtoken';
import { query } from '../../Db';
import type { User, UserData } from '../../Domain/Model/user.model';
import type { IUserLoginDto } from "../../Domain/Interfaces/IUser.interface";
const bcrypt = require("bcryptjs");
const jwtSecret = process.env["JWTSECRET"];


export async function registerUser(data:UserData):Promise<User|string>{
  const existingUser = await getUserByName(data.name);
  if (existingUser) {
    return "Usuarname ya utilizado";
  }else{ 
    const _query = "INSERT INTO users(name,email,age,role,password) VALUES($1,$2,$3,$4,$5) RETURNING *"
    let hashedPassword = data.password;
    if(data.password !== null){
      hashedPassword = await bcrypt.hash(data.password,10); 
    }
    const queryParams = [ data.name,data.email,data.age,data.role,hashedPassword];
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

export async function getUserByName(username: string):Promise<User>{
    const consult = `SELECT * FROM users WHERE name = $1`;
    const result = await query(consult, [username]);
    return result.rows[0];
}

export async function deleteUsername(userId:string):Promise<User>{
  const consult = `Delete from users where id = ${userId} RETURNING *;`;
    const result = await query(consult);
    return result.rows[0];
}

export async function Login(data:IUserLoginDto){
  const userFromBb = await getUserByName(data.email);


  if(userFromBb === undefined){
    return {
      ok: false,
      message: "Usuario no encontrado",
    };
  }

  const checkPassword = await bcrypt.compare(
    data.password,
    userFromBb.password
  );
  
  console.log("-->: ",userFromBb);
  console.log("-->: ",userFromBb.id);
  console.log("-->: ",userFromBb.role);
  
  const payload = {
    userId: userFromBb.id,
    userRole: userFromBb.role,
  };
  const token = jwt.sign(payload, jwtSecret as string, { expiresIn: "50m" });

  if (checkPassword) {
    const data = {
      ok: true,
      user: userFromBb,
      token: token,
    };
    return data;
  } else {
    return {
      ok: false,
      message: "Error",
    };
  }
}

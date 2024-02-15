import { Request, Response } from "express";
import { getUserByEmail, registerUser, updateUser } from "../Data/User.data";
import type { UserData } from "../../Domain/Model/user.model";
import type { IUserUpdateDto } from "../../Domain/Interfaces/IUser.interface";
import "dotenv/config";

import jwt from 'jsonwebtoken';
const bcrypt = require("bcryptjs");
const jwtSecret = process.env["JWTSECRET"];

class UserService{
  async Login(req:Request, res:Response){
    try{
      const email = req.body.email;
      const password = req.body.password;
      const userFromBb = await getUserByEmail(email);
      if(userFromBb === undefined){
        return res.status(404).json({
          ok: false,
          message: "Usuario no encontrado",
        });
      }

      const checkPassword = await bcrypt.compare(
        password,
        userFromBb.password
      );
      
      const payload = {
        id: userFromBb.id,
        role: userFromBb.role,
      };
      
      const token = jwt.sign(payload, jwtSecret as string, { expiresIn: "120m" });
      
      if (checkPassword) {
        return res.status(200).json({
          ok:true,
          token:token
        }) 
      } else {
        return res.status(401).json({
          ok: false,
          message: "credenciales incorrectas",
        });
      }
          
    }catch(error){
      return res.status(500).json({
        ok: false,
        msg: "Error de Servidor",
        data: error,
      });
    }
  }

  async updateUser(req:Request,res:Response){
    try{
      const id = req.params["id"];
      const name = req.body.name;
      const age = req.body.age;
      const password = req.body.password;
      const updtUserData:IUserUpdateDto = {
        name: name,
        age: age,
        password:password
      }
      console.log(updtUserData);
      const result = await updateUser(id,updtUserData);
      return res.status(200).json({
        ok:true,
        message:"actualizado correctamente",
        result: result
      })
    }catch(error){
      return res.status(500).json({
        ok: false,
        msg: "Error de Servidor",
        data: error,
      });
    }
  }

  async createUser(req:Request, res:Response) {
    try{
        const name = req.body.name;
        const mail = req.body.mail;
        const age = req.body.age;
        const role = req.body.role;
        const password = req.body.password;

        const userData: UserData = {
            name: name,
            email: mail,
            age: parseInt(age) || null,
            role: role || 'user',
            password: password || null
        };
        
        const user = await registerUser(userData);
        
        if(user === 'Usuarname ya utilizado'){
          return res.status(409).json({
            ok: false,
            message: user,
          });
        }else{
          return res.status(200).json({
            ok: true,
            user: user,
          });
        }

    }catch(error){
      return res.status(500).json({
        ok: false,
        msg: "Error de Servidor",
        data: error,
      });
    }
  }

}


export const User_Service = new UserService();
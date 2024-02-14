import { Request, Response } from "express";
import { Login, registerUser } from "../Data/User.data";
import type { UserData } from "../../Domain/Model/user.model";

class UserService{

    async Login(req:Request, res:Response){
        try{
            const request: any = {
                username: req.body.username,
                password: req.body.password,
              };
              const response = await Login(request);
              if (response.ok) {
                return res.status(200).json({
                  message: "Login",
                  data: response,
                });
              } else {
                return res
                  .status(401)
                  .json({ message: "Nose pudo ingresar", data: response });
              }
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
import { Request, Response } from "express";
import { User_Service } from "../Service/User.service";

class UserController{
    Login(req:Request, res:Response){
        User_Service.Login(req,res);
    }

    Update(req:Request, res:Response){
        User_Service.updateUser(req,res);
    }

    Register(req:Request, res:Response){
        User_Service.createUser(req,res);   
    }
}

export const User_Controller = new UserController();


import { Request, Response } from "express";

export class UserController{

    async getAllUsers(req:Request, res:Response){
        return await User_Service.getUsers(req, res);
    }

    async getMe(req:Request, res:Response){
        return await User_Service.getUserById(req,res);
    }

    async updateMe(req:Request, res:Response){
        return await User_Service.updateUser(req,res);
    }

    async SignIn(req:Request, res:Response){
        return await User_Service.signIn(req, res);
    }

    async deleteMe(req:Request, res:Response){
        return await User_Service.deleteMe(req,res);
    }

    async createUser(req:Request, res:Response){
        return await User_Service.createUser(req, res);   
    }
}


export const User_Controller = new UserController();


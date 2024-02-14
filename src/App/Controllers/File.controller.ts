import { Request, Response } from "express";
import { File_Service } from "../Service/File.service";

class FileController{

    pruebaPost(req:Request, res:Response){
        File_Service.getFilePath(req,res);
    }

    async getTest(req:Request, res:Response){
        res.send({
            ok:true,
            message:"mrd"
        })
    }
}


export const File_Controller = new FileController();


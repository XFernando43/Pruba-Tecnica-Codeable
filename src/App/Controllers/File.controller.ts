import { Request, Response } from "express";
import { File_Service } from "../Service/File.service";

class FileController{
    uploadCsv(req:Request, res:Response){
        File_Service.getFilePath(req,res);
    }
}


export const File_Controller = new FileController();


import { Request, Response } from "express";


class FileController{

    pruebaPost(req:Request, res:Response){
    //    const documentFile = (req as any).file;
    //    if(!documentFile){
    //     return res.status(400).send('No se ha enviado ningún archivo');
    //    }else{
    //       res.send(`El archivo ${documentFile} se ha subido correctamente.`);
    //    }
    }

    async getTest(req:Request, res:Response){
        res.send({
            ok:true,
            message:"mrd"
        })
    }
}


export const File_Controller = new FileController();


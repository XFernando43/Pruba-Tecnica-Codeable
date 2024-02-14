import { Request, Response } from "express";
const {readFileSync} = require('fs');
const { parse } = require('csv-parse/sync')

class FileService{

    async getFilePath(req:Request, res:Response){
        const documentFile = req.file;      
        if (!documentFile) {
            console.log(documentFile);
            return res.status(400).send({
                ok:false,
                message:'Documento no enviado correctamente'
            });
        }
        const fileContent = readFileSync(documentFile?.path,'utf-8');
        const csvContent = parse(fileContent,{columns:true , delimiter: [';']});
        
        console.log(fileContent);
        console.log(csvContent);
        
        for(let columna in csvContent){
            console.log(csvContent[columna]["name"]);
            console.log(csvContent[columna]["email"]);
            console.log(csvContent[columna]["age"]);
        }
      

        return res.send({
            ok:true,
            message:'documento cargado correctamente'
        });
        
    }
        

}


export const File_Service = new FileService();
import { Request, Response } from "express";
import type { UserData } from "../../Domain/Model/user.model";
import { registerUser } from "../Data/User.data";
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
            console.log(parseInt(csvContent[columna]["age"]));

            const _userData:UserData={
                name:csvContent[columna]["name"],
                email:csvContent[columna]["email"],
                age: parseInt(csvContent[columna]["age"]),
                role:csvContent[columna]["rol"] || 'user'
            }

            await registerUser(_userData);
        }
      
        return res.send({
            ok:true,
            message:'documento cargado correctamente',
            success:[]
        });
        
    }

}


export const File_Service = new FileService();
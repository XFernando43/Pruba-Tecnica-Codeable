import { Request, Response } from "express";
import type { UserData } from "../../Domain/Model/user.model";
import { registerUser } from "../Data/User.data";
const {readFileSync} = require('fs');
const { parse } = require('csv-parse/sync')

class FileService{

    async getFilePath(req:Request, res:Response){
        const documentFile = req.file;      
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
        if (!documentFile) {
            console.log(documentFile);
            return res.status(400).send({
                ok: false,
                message: 'Documento no enviado correctamente'
            });
        }
    
        try {
            const fileContent = readFileSync(documentFile.path, 'utf-8');
            const csvContent = parse(fileContent, { columns: true, delimiter: [';'] });
            
            const usersAdded = []; 
            const errorDetails = []; 
            
            console.log(csvContent);

            for (const row of csvContent) {
                const email = row.email;
                const age = row.age;
                if (email && emailRegex.test(email) && age > 0) {
                    usersAdded.push(row);
                    const userData: UserData = {
                        name: row.name,
                        email: row.email,
                        age: parseInt(row.age) || null,
                        role: row.role || 'user'
                    };
                    await registerUser(userData); 
                } else {
                    errorDetails.push(row);
                }


            }
    
            return res.send({
                ok: true,
                message: 'Documento cargado correctamente',
                success: usersAdded,
                errors: errorDetails
            });
        } catch (error) {
            console.error("Error al procesar el archivo:", error);
            return res.status(500).send({
                ok: false,
                message: 'Error al procesar el archivo'
            });
        }
        
    }

}


export const File_Service = new FileService();
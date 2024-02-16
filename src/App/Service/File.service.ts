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
            const errors: { [key: string]: string } = {};
            let rowCount = 0;
            let result;
            for (const row of csvContent) {
                const name = row.name;
                const email = row.email;
                const age = row.age;
                
                if (email && emailRegex.test(email) && age > 0) {
                    const userData: UserData = {
                        name: row.name,
                        email: row.email,
                        age: parseInt(row.age) || null,
                        role: row.role || 'user',
                        password: row.password || null
                    };
                    result = await registerUser(userData); 
                    if(result !== 'Usuarname ya utilizado'){
                        usersAdded.push(row);
                    }
                } else {
                    if(result === 'Usuarname ya utilizado'){
                        rowCount+=1;
                        errors["name"] = "Usernames ya en uso actualmente";
                    }
                    if(!name || name.length < 0 ||  name.trim() === ''){
                        errors["name"] = "el nombre no debe ser vacio";
                        rowCount+=1;
                    }
                    if(!email || !emailRegex.test(email)){
                        errors["email"] = "El formato del campo 'email' es inválido o está vacío.";
                        rowCount+=1;
                    }
                    if(age < 0){
                        rowCount+=1;
                        errors["age"] = "El formato del campo 'age' debe ser mayor a 0.";
                    }
                }
            }

            readFileSync.unlink(documentFile.path);

            return res.send({
                ok: true,
                message: 'Documento cargado correctamente',
                data:{
                    success: usersAdded,
                    errors: {
                        rowCount,
                        errors
                    } 

                }
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
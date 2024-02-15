import "dotenv/config"
import { adminClient } from ".."

const dbName = process.env["DATABASE2"]

adminClient.connect();


adminClient.query(`create database ${dbName}`, (err)=>{
    if(err){
        console.log("error al crear la base de datos", err.stack);
    }else{
        console.log(`Base de datos ${dbName} creada exitosamente`)
    }
    adminClient.end();
});

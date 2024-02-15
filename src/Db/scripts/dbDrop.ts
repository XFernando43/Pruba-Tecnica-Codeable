import "dotenv/config"
import { adminClient } from ".."

const dbName = process.env["DATABASE2"]

adminClient.connect();


adminClient.query(`drop database ${dbName}`, (err)=>{
    if(err){
        console.log("error al eliminar la base de datos", err.stack);
    }else{
        console.log(`Base de datos ${dbName} eliminada exitosamente`)
    }
    adminClient.end();
});

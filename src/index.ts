import express from 'express';

import "dotenv/config";

export const app = express();
const port = process.env["PORT"]

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


app.use(express.json());

app.listen(port, () => {console.log(`Servidor escuchando en el puerto ${port}`);});
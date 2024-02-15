import { FileRouter } from './App/Routers/File.routes';
import express from 'express';
import { UserRouter } from './App/Routers/User.routes';

export const app = express();
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(express.json());
app.use('/files',FileRouter);
app.use('/user',UserRouter);

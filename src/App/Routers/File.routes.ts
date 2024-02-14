import express from "express";
import { File_Controller } from "../Controllers/File.controller";
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' }); // Directorio donde se guardarán temporalmente los archivos subidos


export const FileRouter = express.Router();


FileRouter.post(
  "/upload",
  upload.single('csvFile'),
  File_Controller.pruebaPost
);

FileRouter.get(
  "/GetTest",
  File_Controller.getTest
);

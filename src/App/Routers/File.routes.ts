import express from "express";
const multer  = require('multer');
import { File_Controller } from "../Controllers/File.controller";

const upload = multer({ dest: 'uploads/' }); // Directorio donde se guardarán temporalmente los archivos subidos
export const FileRouter = express.Router();


FileRouter.post(
  "/upload",
  upload.single('csvFile'), // Middleware de multer para manejar el archivo
  (req, res) => {
    const documentFile = req.file;
    if (!documentFile) {
      console.log(documentFile);
      return res.status(400).send('No se ha enviado ningún archivo');
    }
    return res.send(`El archivo ${documentFile.filename} se ha subido correctamente.`);
  }
);

FileRouter.get(
  "/GetTest",
  File_Controller.getTest
);

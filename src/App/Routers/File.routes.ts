import express from "express";
import { File_Controller } from "../Controllers/File.controller";
import { authenticateHandler } from "../../Midelware/authentication.mdw";
import { authorize } from "../../Midelware/authorization.mdw";
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' }); // Directorio donde se guardarán temporalmente los archivos subidos
export const FileRouter = express.Router();

FileRouter.post(
  "/upload",
  upload.single('csvFile'),
  authenticateHandler,
  authorize("admin"),
  File_Controller.uploadCsv
);

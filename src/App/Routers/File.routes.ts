import express from "express";
import { File_Controller } from "../Controllers/File.controller";
import { authenticateHandler } from "../../Midelware/authentication.mdw";
import { authorize } from "../../Midelware/authorization.mdw";
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' }); 
export const FileRouter = express.Router();

FileRouter.post(
  "/upload",
  authenticateHandler,
  authorize("admin"),
  upload.single('csvFile'),
  File_Controller.uploadCsv
);

import express from "express";
// import { authenticateHandler } from "../../Midelware/authentication.mdw";
// import { authorize } from "../../Midelware/authorization.mdw";
import { User_Controller } from "../Controllers/User.controller";
export const UserRouter = express.Router();

UserRouter.post(
  "/login"
  // ,authenticateHandler
  // ,authorize("admin","user")
  ,User_Controller.Login
);
  
UserRouter.post(
  "/register",
  User_Controller.Register
);
  
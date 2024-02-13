import express from "express";
import { authenticateHandler } from "../../Midelware/authentication.mdw";
import { authorize } from "../../Midelware/authorization.mdw";
import { schemaValidation } from "../Schemas/schema.validation";
import { LoginSchema } from "../Schemas/user.schema";

export const userRouter = express.Router();

userRouter.get(
  "/getAll",
  authenticateHandler,
  authorize("admin"),
//   User_Controller.getAllUsers
  
);

userRouter.get(
  "/me",
  authenticateHandler,
  authorize("admin","user"),
//   User_Controller.getMe
  
);

userRouter.post(
  "/signup",
  schemaValidation(LoginSchema),
//   User_Controller.createUser
);

// userRouter.patch(
//   "/me",
//   authenticateHandler,
//   authorize("admin","user"),
//   User_Controller.updateMe
// );
  
// userRouter.delete(
//   "/me",
//   authenticateHandler,
//   authorize("admin","user"),
//   User_Controller.deleteMe
// );

userRouter.post("/SignIn", async (_req, res) => {
//   User_Controller.SignIn(_req, res);
});
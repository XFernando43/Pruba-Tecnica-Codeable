import express from "express";
import { authenticateHandler } from "../../Midelware/authentication.mdw";
import { authorize } from "../../Midelware/authorization.mdw";
export const userRouter = express.Router();

userRouter.get(
  "/getAll",
  authenticateHandler,
  authorize("admin"),
);
  
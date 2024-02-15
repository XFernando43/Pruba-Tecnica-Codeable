import { NextFunction, Request, Response } from "express";
import { ApiError } from "./error";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env["JWTSECRET"];

declare global {
  namespace Express {
    interface Request {
      id: string;
      name: string;
      role: string;
    }
  }
}

export function authenticateHandler(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    // return next(new ApiError("No authenticado", 401));
    return next(ApiError.response(_res,"Usuario no authenticado",401));
  }
  
  try {
    const payload = jwt.verify(token, JWT_SECRET as string) as {
      id:string;
      role:string;
      iat: number;
      exp: number;
    };

    req.id = payload.id;
    req.role = payload.role;
    next();
  } catch (error) {
    return next(new ApiError("No autorizado", 401));
  }
}
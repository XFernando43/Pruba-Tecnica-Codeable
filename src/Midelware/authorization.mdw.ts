import { NextFunction, Request, Response } from "express";
import { ApiError } from "./error";
import type { User } from "../Domain/Model/user.model";

export function authorize(...allowedRoles: User["role"][]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    
    const role = req.role;

    if (!role) return next(new ApiError("No autorizado", 401));
 
    if (allowedRoles.includes(role as User["role"])) {
      next();
    } else {
      // next(new ApiError("Acceso denegado funcion solo para usuarios administradores", 403));
      next(ApiError.response(res,"Acceso denegado funcion solo para usuarios administradores", 403));
    }
    
  };
}
 
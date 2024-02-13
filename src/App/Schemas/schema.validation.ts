import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";

export const schemaValidation =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
      return;
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          ok: false,
          message: error.errors,
        });
      }
      console.error("Error during schema validation:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
};
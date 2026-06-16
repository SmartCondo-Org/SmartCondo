import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";

type Role = "Administrador" | "Morador" | "Sindico";

export function ensureRole(roles: Role[]) {
  return (request: Request, response: Response, next: NextFunction) => {
    const { user } = request;

    if (!user) {
      throw new AppError("User not authenticated", 401);
    }

    if (!roles.includes(user.tipo_usuario)) {
      throw new AppError("User does not have permission", 403);
    }

    return next();
  };
}

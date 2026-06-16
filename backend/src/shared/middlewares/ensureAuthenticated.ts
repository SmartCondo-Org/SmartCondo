import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";

interface IPayload {
  sub: string;
  tipo_usuario: "Administrador" | "Morador" | "Sindico";
  id_condominio?: number;
  id_apartamento?: number;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token is missing", 401);
  }

  // O header vem no formato: "Bearer <token>"
  const [, token] = authHeader.split(" ");

  try {
    const secret = process.env.JWT_SECRET || "default_secret";
    
    // Verifica se é válido e extrai os dados
    const decoded = verify(token, secret) as IPayload;

    // Injeta os dados na requisição para as próximas etapas (ex: ensureRole)
    request.user = {
      id_usuario: Number(decoded.sub),
      tipo_usuario: decoded.tipo_usuario,
      id_condominio: decoded.id_condominio,
      id_apartamento: decoded.id_apartamento,
    };

    return next();
  } catch (err) {
    throw new AppError("Invalid token", 401);
  }
}
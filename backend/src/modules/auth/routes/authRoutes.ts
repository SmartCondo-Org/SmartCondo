import { Router, Request, Response, NextFunction } from "express";
import { AuthController } from "../controllers/AuthController";
import { ensureAuthenticated } from "../../../shared/middlewares/ensureAuthenticated";
import { ensureRole } from "../../../shared/middlewares/ensureRole";
import { prismaClient } from "../../../shared/database/prismaClient";

export const authRoutes = Router();
const authController = new AuthController();

authRoutes.post("/login", authController.login);

// Middleware dinâmico para permitir a criação do 1º Admin
const checkFirstUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const usersCount = await prismaClient.usuario.count();
  
  if (usersCount === 0) {
    // Se não há nenhum usuário no sistema, força o tipo para Administrador por segurança e permite passar
    req.body.tipo_usuario = "Administrador";
    return next();
  }
  
  // Se já existem usuários, exige autenticação e privilégios normais
  return ensureAuthenticated(req, res, (err) => {
    if (err) return next(err);
    ensureRole(["Administrador", "Sindico"])(req, res, next);
  });
};

authRoutes.post("/register", checkFirstUserMiddleware, authController.register);
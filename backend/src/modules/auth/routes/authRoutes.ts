import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { ensureAuthenticated } from "../../../shared/middlewares/ensureAuthenticated";
import { ensureRole } from "../../../shared/middlewares/ensureRole";

export const authRoutes = Router();
const authController = new AuthController();

authRoutes.post("/login", authController.login);

// Only Administrador or Sindico can create users
authRoutes.post(
  "/register",
  ensureAuthenticated,
  ensureRole(["Administrador", "Sindico"]),
  authController.register
);

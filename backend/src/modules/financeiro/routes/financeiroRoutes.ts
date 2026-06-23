import { Router } from "express";
import { FinanceiroController } from "../controllers/FinanceiroController";
import { ensureAuthenticated } from "../../../shared/middlewares/ensureAuthenticated";
import { ensureRole } from "../../../shared/middlewares/ensureRole";

export const financeiroRoutes = Router();
const financeiroController = new FinanceiroController();

// Todos os endpoints financeiros exigem autenticação
financeiroRoutes.use(ensureAuthenticated);

// Listagem inteligente (o Service decide o que devolver baseado no Perfil)s
financeiroRoutes.get("/", financeiroController.list);

// Criação e Atualização são restritos à gestão
financeiroRoutes.post(
  "/", 
  ensureRole(["Administrador", "Sindico"]), 
  financeiroController.create
);

financeiroRoutes.patch(
  "/:id/status", 
  ensureRole(["Administrador", "Sindico"]), 
  financeiroController.updateStatus
);
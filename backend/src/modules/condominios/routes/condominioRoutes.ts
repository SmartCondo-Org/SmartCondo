import { Router } from "express";
import { CondominioController } from "../controllers/CondominioController";
import { ApartamentoController } from "../controllers/ApartamentoController";
import { ensureAuthenticated } from "../../../shared/middlewares/ensureAuthenticated";
import { ensureRole } from "../../../shared/middlewares/ensureRole";

export const condominioRoutes = Router();
const condominioController = new CondominioController();
const apartamentoController = new ApartamentoController();

condominioRoutes.use(ensureAuthenticated);

condominioRoutes.post("/", ensureRole(["Administrador"]), condominioController.create);
condominioRoutes.post("/apartamentos", ensureRole(["Administrador", "Sindico"]), apartamentoController.create);
condominioRoutes.patch("/apartamentos/:id_apartamento/vincular", ensureRole(["Administrador", "Sindico"]), apartamentoController.vincularMorador);
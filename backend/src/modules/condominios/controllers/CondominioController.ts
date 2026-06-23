import { Request, Response } from "express";
import { CreateCondominioService } from "../services/CreateCondominioService";

export class CondominioController {
  async create(request: Request, response: Response) {
    const { nome, cnpj, endereco } = request.body;
    const createCondominioService = new CreateCondominioService();
    const condominio = await createCondominioService.execute({ nome, cnpj, endereco });
    return response.status(201).json(condominio);
  }
}
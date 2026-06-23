import { Request, Response } from "express";
import { FinanceiroService } from "../services/FinanceiroService";

export class FinanceiroController {
  async create(request: Request, response: Response) {
    const { id_condominio, id_apartamento, descricao, tipo, valor, status_pagamento, data_vencimento } = request.body;
    
    const financeiroService = new FinanceiroService();
    const transacao = await financeiroService.create({
      id_condominio,
      id_apartamento,
      descricao,
      tipo,
      valor,
      status_pagamento,
      data_vencimento: new Date(data_vencimento),
    });

    return response.status(201).json(transacao);
  }

  async list(request: Request, response: Response) {
    const user = request.user; // Injetado pelo ensureAuthenticated
    
    const financeiroService = new FinanceiroService();
    const transacoes = await financeiroService.list(user);

    return response.json(transacoes);
  }

  async updateStatus(request: Request, response: Response) {
    const { id } = request.params;

    const financeiroService = new FinanceiroService();
    const transacao = await financeiroService.markAsPaid(Number(id));

    return response.json(transacao);
  }
}
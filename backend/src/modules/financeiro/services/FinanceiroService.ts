import { FinanceiroRepository } from "../repositories/FinanceiroRepository";
import { AppError } from "../../../shared/errors/AppError";
import { CreateTransacaoDTO } from "../dtos/FinanceiroDTOs";

export class FinanceiroService {
  private financeiroRepository: FinanceiroRepository;

  constructor() {
    this.financeiroRepository = new FinanceiroRepository();
  }

  async create(data: CreateTransacaoDTO) {
    // Validações de domínio
    if (data.tipo !== "Despesa" && data.tipo !== "Receita") {
      throw new AppError("Tipo de transação inválido. Use 'Despesa' ou 'Receita'.");
    }

    return await this.financeiroRepository.create(data);
  }

  async list(user: { tipo_usuario: string; id_condominio?: number; id_apartamento?: number }) {
    // Regra de Isolamento Multi-tenant
    if (user.tipo_usuario === "Morador") {
      if (!user.id_apartamento) {
        throw new AppError("Morador sem apartamento vinculado.", 403);
      }
      // Morador vê APENAS as transações do seu apartamento
      return await this.financeiroRepository.findAllByApartamento(user.id_apartamento);
    }

    // Administrador ou Síndico veem as transações do condomínio
    if (!user.id_condominio) {
      throw new AppError("Utilizador gestor sem condomínio vinculado.", 403);
    }
    return await this.financeiroRepository.findAllByCondominio(user.id_condominio);
  }

  async markAsPaid(id_transacao: number) {
    const transacao = await this.financeiroRepository.findById(id_transacao);
    
    if (!transacao) {
      throw new AppError("Transação não encontrada.", 404);
    }

    if (transacao.status_pagamento === "Pago") {
      throw new AppError("Esta transação já se encontra paga.", 400);
    }

    return await this.financeiroRepository.updateStatus(id_transacao, "Pago");
  }
}
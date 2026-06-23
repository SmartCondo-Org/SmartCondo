import { prismaClient } from "../../../shared/database/prismaClient";
import { Prisma } from "@prisma/client";

export class FinanceiroRepository {
  async create(data: Prisma.TransacaoUncheckedCreateInput) {
    return await prismaClient.transacao.create({
      data,
    });
  }

  async findAllByCondominio(id_condominio: number) {
    return await prismaClient.transacao.findMany({
      where: { id_condominio },
      orderBy: { data_vencimento: 'desc' }
    });
  }

  async findAllByApartamento(id_apartamento: number) {
    return await prismaClient.transacao.findMany({
      where: { id_apartamento },
      orderBy: { data_vencimento: 'desc' }
    });
  }

  async findById(id_transacao: number) {
    return await prismaClient.transacao.findUnique({
      where: { id_transacao }
    });
  }

  async updateStatus(id_transacao: number, status_pagamento: string) {
    return await prismaClient.transacao.update({
      where: { id_transacao },
      data: { 
        status_pagamento,
        data_pagamento: status_pagamento === "Pago" ? new Date() : null
      }
    });
  }
}
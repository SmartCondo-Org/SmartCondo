export interface CreateTransacaoDTO {
  id_condominio: number;
  id_apartamento?: number; // Opcional, pois pode ser uma despesa geral do condomínio
  descricao: string;
  tipo: "Despesa" | "Receita";
  valor: number;
  status_pagamento: "Atrasado" | "Pendente" | "Pago";
  data_vencimento: Date;
}
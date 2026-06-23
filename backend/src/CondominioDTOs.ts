export interface CreateCondominioDTO {
  nome: string;
  cnpj: string;
  endereco: string;
}

export interface CreateApartamentoDTO {
  bloco: string;
  numero: string;
  id_condominio: number;
}

export interface VincularMoradorDTO {
  id_apartamento: number;
  id_usuario: number;
}
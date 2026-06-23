export interface RegisterUserDTO {
  cpf: string;
  nome: string;
  email: string;
  senha: string;
  tipo_usuario: "Administrador" | "Morador" | "Sindico";
  telefone?: string;
}

export interface LoginUserDTO {
  email: string;
  senha: string;
}
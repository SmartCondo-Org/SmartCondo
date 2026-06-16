declare namespace Express {
  export interface Request {
    user: {
      id_usuario: number;
      tipo_usuario: "Administrador" | "Morador" | "Sindico";
      id_condominio?: number;
      id_apartamento?: number;
    };
  }
}
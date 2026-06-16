declare namespace Express {
  export interface Request {
    user?: {
      id_usuario: number;
      id_condominio?: number;
      id_apartamento?: number;
      tipo_usuario: "Administrador" | "Morador" | "Sindico";
    };
  }
}

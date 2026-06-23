import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

export class AuthController {
  async register(request: Request, response: Response) {
    const { cpf, nome, email, senha, tipo_usuario, telefone } = request.body;

    const authService = new AuthService();

    const user = await authService.register({
      cpf,
      nome,
      email,
      senha,
      tipo_usuario,
      telefone
    });

    return response.status(201).json(user);
  }

  async login(request: Request, response: Response) {
    const { email, senha } = request.body;
    const authService = new AuthService();
    const result = await authService.login({ email, senha });
    return response.json(result);
  }
}
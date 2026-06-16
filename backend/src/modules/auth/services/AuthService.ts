import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AuthRepository } from "../repositories/AuthRepository";
import { AppError } from "../../../shared/errors/AppError";
import { RegisterUserDTO, LoginUserDTO } from "../dtos/AuthDTOs";
import { prismaClient } from "../../../shared/database/prismaClient";

export class AuthService {
  private authRepository: AuthRepository;

  constructor() {
    this.authRepository = new AuthRepository();
  }

  async register({ cpf, nome, email, senha, tipo_usuario, id_apartamento }: RegisterUserDTO) {
    const userEmailExists = await this.authRepository.findByEmail(email);
    if (userEmailExists) {
      throw new AppError("Email already in use");
    }

    const userCpfExists = await this.authRepository.findByCpf(cpf);
    if (userCpfExists) {
      throw new AppError("CPF already in use");
    }

    const senha_hash = await hash(senha, 8);

    const user = await this.authRepository.create({
      cpf,
      nome,
      email,
      senha_hash,
      tipo_usuario,
      apartamento: id_apartamento ? { connect: { id_apartamento } } : undefined
    });

    return user;
  }

  async login({ email, senha }: LoginUserDTO) {
    const user = await this.authRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Incorrect email/password combination", 401);
    }

    const passwordMatch = await compare(senha, user.senha_hash);

    if (!passwordMatch) {
      throw new AppError("Incorrect email/password combination", 401);
    }

    const secret = process.env.JWT_SECRET || "default_secret";
    
    let id_condominio: number | undefined;
    if (user.id_apartamento) {
      const apto = await prismaClient.apartamento.findUnique({ where: { id_apartamento: user.id_apartamento } });
      if (apto) id_condominio = apto.id_condominio;
    }

    const token = sign(
      { 
        tipo_usuario: user.tipo_usuario,
        id_condominio,
        id_apartamento: user.id_apartamento
      },
      secret,
      {
        subject: String(user.id_usuario),
        expiresIn: "1d",
      }
    );

    return {
      user: {
        id_usuario: user.id_usuario,
        nome: user.nome,
        email: user.email,
        tipo_usuario: user.tipo_usuario,
      },
      token,
    };
  }
}

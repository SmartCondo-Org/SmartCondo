import { prismaClient } from "../../../shared/database/prismaClient";
import { Prisma } from "@prisma/client";

export class AuthRepository {
  async findByEmail(email: string) {
    return await prismaClient.usuario.findUnique({
      where: { email },
    });
  }

  async findByCpf(cpf: string) {
    return await prismaClient.usuario.findUnique({
      where: { cpf },
    });
  }

  async create(data: Prisma.UsuarioCreateInput) {
    return await prismaClient.usuario.create({
      data,
    });
  }
}
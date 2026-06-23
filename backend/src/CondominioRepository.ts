import { prismaClient } from "../../../shared/database/prismaClient";
import { CreateCondominioDTO } from "../dtos/CondominioDTOs";

export class CondominioRepository {
  async create(data: CreateCondominioDTO) {
    return await prismaClient.condominio.create({ data });
  }
  
  async findByCnpj(cnpj: string) {
    return await prismaClient.condominio.findUnique({ where: { cnpj } });
  }
  
  async findById(id: number) {
    return await prismaClient.condominio.findUnique({ where: { id_condominio: id } });
  }
}
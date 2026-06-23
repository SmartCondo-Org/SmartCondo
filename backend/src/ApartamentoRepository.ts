import { prismaClient } from "../../../shared/database/prismaClient";
import { CreateApartamentoDTO } from "../dtos/CondominioDTOs";

export class ApartamentoRepository {
  async create(data: CreateApartamentoDTO) {
    return await prismaClient.apartamento.create({ data });
  }
  
  async findByBlocoENumero(bloco: string, numero: string, id_condominio: number) {
    return await prismaClient.apartamento.findFirst({
      where: { bloco, numero, id_condominio }
    });
  }
  
  async findById(id: number) {
    return await prismaClient.apartamento.findUnique({ where: { id_apartamento: id } });
  }
  
  async vincularUsuario(id_apartamento: number, id_usuario: number) {
    return await prismaClient.apartamento.update({
      where: { id_apartamento },
      data: { id_usuario }
    });
  }
}
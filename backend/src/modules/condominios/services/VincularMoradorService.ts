import { ApartamentoRepository } from "../repositories/ApartamentoRepository";
import { prismaClient } from "../../../shared/database/prismaClient";
import { AppError } from "../../../shared/errors/AppError";
import { VincularMoradorDTO } from "../dtos/CondominioDTOs";

export class VincularMoradorService {
  async execute({ id_apartamento, id_usuario }: VincularMoradorDTO) {
    const apartamentoRepository = new ApartamentoRepository();

    const apartamentoExists = await apartamentoRepository.findById(id_apartamento);
    if (!apartamentoExists) throw new AppError("Apartamento não encontrado", 404);

    const usuarioExists = await prismaClient.usuario.findUnique({ where: { id_usuario } });
    if (!usuarioExists) throw new AppError("Usuário não encontrado", 404);

    return await apartamentoRepository.vincularUsuario(id_apartamento, id_usuario);
  }
}
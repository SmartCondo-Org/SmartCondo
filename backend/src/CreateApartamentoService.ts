import { ApartamentoRepository } from "../repositories/ApartamentoRepository";
import { CondominioRepository } from "../repositories/CondominioRepository";
import { AppError } from "../../../shared/errors/AppError";
import { CreateApartamentoDTO } from "../dtos/CondominioDTOs";

export class CreateApartamentoService {
  async execute({ bloco, numero, id_condominio }: CreateApartamentoDTO) {
    const apartamentoRepository = new ApartamentoRepository();
    const condominioRepository = new CondominioRepository();

    const condominioExists = await condominioRepository.findById(id_condominio);
    if (!condominioExists) throw new AppError("Condomínio não encontrado", 404);

    const apartamentoExists = await apartamentoRepository.findByBlocoENumero(bloco, numero, id_condominio);
    if (apartamentoExists) throw new AppError("Apartamento já cadastrado neste condomínio", 400);

    return await apartamentoRepository.create({ bloco, numero, id_condominio });
  }
}
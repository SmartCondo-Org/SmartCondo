import { CondominioRepository } from "../repositories/CondominioRepository";
import { AppError } from "../../../shared/errors/AppError";
import { CreateCondominioDTO } from "../dtos/CondominioDTOs";

export class CreateCondominioService {
  async execute({ nome, cnpj, endereco }: CreateCondominioDTO) {
    const condominioRepository = new CondominioRepository();
    
    const condominioExists = await condominioRepository.findByCnpj(cnpj);
    if (condominioExists) {
      throw new AppError("Condomínio com este CNPJ já cadastrado", 400);
    }
    
    return await condominioRepository.create({ nome, cnpj, endereco });
  }
}
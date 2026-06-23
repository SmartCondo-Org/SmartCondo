import { Request, Response } from "express";
import { CreateApartamentoService } from "../services/CreateApartamentoService";
import { VincularMoradorService } from "../services/VincularMoradorService";

export class ApartamentoController {
  async create(request: Request, response: Response) {
    const { bloco, numero, id_condominio } = request.body;
    const createApartamentoService = new CreateApartamentoService();
    const apartamento = await createApartamentoService.execute({ bloco, numero, id_condominio });
    return response.status(201).json(apartamento);
  }

  async vincularMorador(request: Request, response: Response) {
    const { id_apartamento } = request.params;
    const { id_usuario } = request.body;
    const vincularMoradorService = new VincularMoradorService();
    
    const apartamento = await vincularMoradorService.execute({
      id_apartamento: Number(id_apartamento),
      id_usuario: Number(id_usuario)
    });
    
    return response.status(200).json(apartamento);
  }
}
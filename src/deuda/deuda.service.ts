import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Contacto } from "../contacto/entities/contacto.entity";
import { Repository } from "typeorm";
import { Deuda, DEUDA_COLUMNA_FECHA_CONTACTADA } from "./entities/deuda.entity";

@Injectable()
export class DeudaService {

    constructor(
      @InjectRepository(Deuda) private deudaRepository: Repository<Deuda>,
    ) {}

    /**
     * Retorna todas las deudas sin contactar
     */
    getDeudasSinContactar(): Promise<Deuda[]> {
        return this.deudaRepository.createQueryBuilder('deuda')
          .where(`${DEUDA_COLUMNA_FECHA_CONTACTADA} is null`)
          .getMany()
    }
}

import { Injectable } from "@nestjs/common";
import { CreateContactoDto } from "./dto/create-contacto.dto";
import { UpdateContactoDto } from "./dto/update-contacto.dto";
import { Contacto } from "./entities/contacto.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { DeudaService } from "../deuda/deuda.service";

@Injectable()
export class ContactoService {

    constructor(
      @InjectRepository(Contacto) private cuentaRepository: Repository<Contacto>,
      private readonly deudaService: DeudaService,
    ) {}

    async ejecutarContactacion() {
        const deudasSinContactar = await this.deudaService.getDeudasSinContactar()
        await new Promise<void>(resolve => {
            setTimeout(() => {resolve()}, 4000)
        })
    }
}

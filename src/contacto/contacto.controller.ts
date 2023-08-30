import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { ContactoService } from "./contacto.service";
import { CreateContactoDto } from "./dto/create-contacto.dto";
import { UpdateContactoDto } from "./dto/update-contacto.dto";

@Controller("contacto")
export class ContactoController {

    private contactacionEnProgreso = false

    constructor(private readonly contactoService: ContactoService) {
    }

    /**
     * Ejecuta la contactacion
     */
    @Get('ejecutar')
    ejecutarContactacion() {
        if (this.contactacionEnProgreso) {
            return "La contactacion ya esta siendo procesada. Aguarde"
        } else {
            this.contactacionEnProgreso = true
            this.contactoService.ejecutarContactacion().then(() => {
                console.log("Ejecucion finalizada")
            }).catch(e => {
                console.error(e)
            }).finally(() => {
                this.contactacionEnProgreso = false
            })
            return "Contactacion iniciada"
        }
    }
}

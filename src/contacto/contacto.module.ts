import { Module } from "@nestjs/common";
import { ContactoService } from "./contacto.service";
import { ContactoController } from "./contacto.controller";
import { DeudaModule } from "../deuda/deuda.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Contacto } from "./entities/contacto.entity";

@Module({
    controllers: [ContactoController],
    providers: [ContactoService],
    imports: [
        TypeOrmModule.forFeature([Contacto]),
        DeudaModule
    ]
})
export class ContactoModule {
}

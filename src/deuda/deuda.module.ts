import { Module } from "@nestjs/common";
import { DeudaService } from "./deuda.service";
import { DeudaController } from "./deuda.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Deuda } from "./entities/deuda.entity";

@Module({
    controllers: [DeudaController],
    providers: [DeudaService],
    imports: [TypeOrmModule.forFeature([Deuda])],
    exports: [DeudaService]
})
export class DeudaModule {
}

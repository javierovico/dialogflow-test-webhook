import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { DeudaService } from "./deuda.service";
import { CreateDeudaDto } from "./dto/create-deuda.dto";
import { UpdateDeudaDto } from "./dto/update-deuda.dto";

@Controller("deuda")
export class DeudaController {
    constructor(private readonly deudaService: DeudaService) {
    }

}

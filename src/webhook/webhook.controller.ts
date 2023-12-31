import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query } from "@nestjs/common";
import { WebhookService } from "./webhook.service";
import { UpdateWebhookDto } from "./dto/update-webhook.dto";
import { createCanvas } from "canvas";
import * as qrcode from 'qrcode';
import { Response } from 'express';
import { IWebhookRequest } from "../utils/dialogflow-interfaces";
import {WebhookWhatsappDto} from "./dto/webhook-whatsapp.dto";


@Controller("webhook")
export class WebhookController {
    constructor(private readonly webhookService: WebhookService) {
    }

    @Post()
    whatsappWebhook(@Body() createWebhookDto: WebhookWhatsappDto) {
        return this.webhookService.whatsappWebhook(createWebhookDto);
    }


    @Get()
    createGet(@Body() body: any, @Param() param: any, @Query() query: any) {
        this.webhookService.createAll({
            body, param, query
        });
        return query['hub.challenge']
    }

    @Get('qr')
    async generateQr(@Res() res: Response) {
        const ready = this.webhookService.isReady
        if (ready) {
            return {
                status: 'ready'
            }
        } else {
            try {
                const qrCanvas = createCanvas(350, 350); // Tamaño del código QR
                await qrcode.toCanvas(qrCanvas, this.webhookService.getQr());
                res.type('png'); // Establecer el tipo de contenido de la respuesta
                qrCanvas.createPNGStream().pipe(res); // Enviar la imagen del código QR como respuesta
            } catch (error) {
                console.error(error)
                res.status(500).json({ message: 'Error generando el código QR' });
            }
        }
    }

    @Get('t')
    findAll() {
        return this.webhookService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.webhookService.findOne(+id);
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateWebhookDto: UpdateWebhookDto) {
        return this.webhookService.update(+id, updateWebhookDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.webhookService.remove(+id);
    }
}

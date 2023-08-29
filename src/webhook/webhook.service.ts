import { Injectable, OnModuleInit } from "@nestjs/common";
import { CreateWebhookDto } from "./dto/create-webhook.dto";
import { UpdateWebhookDto } from "./dto/update-webhook.dto";
import { LogService } from "../log/log.service";
import * as WAWebJS from "whatsapp-web.js";
import { PUPPETEER_OPTIONS } from "../config";
import { google } from "@google-cloud/dialogflow-cx/build/protos/protos";
import IWebhookRequest = google.cloud.dialogflow.cx.v3.IWebhookRequest;
import IWebhookResponse = google.cloud.dialogflow.cx.v3.IWebhookResponse;

@Injectable()
export class WebhookService implements OnModuleInit {

    private clienteWhatsapp: WAWebJS.Client;
    private qr: string | undefined = undefined;
    private status: string | undefined = undefined;
    private ready: boolean = false;
    private authenticated: boolean = false;

    constructor(private readonly logService: LogService) {
    }

    async onModuleInit() {
        this.clienteWhatsapp = new WAWebJS.Client({
            authStrategy: new WAWebJS.LocalAuth({ clientId: "bnf" }),
            puppeteer: PUPPETEER_OPTIONS
        });
        this.clienteWhatsapp.on(`qr`, (qr: any) => {
            this.status = "Qr generado";
            this.qr = qr;
            this.ready = false;
            this.authenticated = false;
            console.log(`Whatsapp: qr generado`, qr);
        });
        this.clienteWhatsapp.on(`authenticated`, () => {
            this.authenticated = true;
            this.status = "Autenticado";
            console.log(`Whatsapp: autenticado`);
        });
        this.clienteWhatsapp.on("loading_screen", (percent: any, message: any) => {
            console.log(`Whatsapp: cargando pantalla: `, percent, message);
            this.status = `Cargando pantalla: ${message} ${percent}%`;
        });
        this.clienteWhatsapp.on(`auth_failure`, (msg: any) => {
            this.authenticated = false;
            this.ready = false;
            console.error(`Whatsapp: error de autenticacion`, msg);
            this.status = `Error de autenticacion: ${msg}`;
        });

        this.clienteWhatsapp.on(`ready`, () => {
            this.ready = true;
            this.authenticated = true;
            console.log(`Whatsapp: listo`);
            this.status = `Listo`;
        });

        /** Vamos a tratar de manejar aca los mensajes recibidos, solo guardamos los mensajes recibidos, no lo que enviamos*/
        this.clienteWhatsapp.on(`message`, async (messageWhatsapp: WAWebJS.Message) => {

        });

        this.clienteWhatsapp.on(`disconnected`, (reason: any) => {
            this.ready = false;
            this.authenticated = false;
            console.warn(`Whatsapp: cliente wa desconectado`, reason);
            this.status = `Cliente desconectado: ${reason}`;
        });
        this.clienteWhatsapp.initialize().then(() => {
            console.log(`Whatsapp: cliente wa inicializado`);
            this.status = `Cliente inicializado`;
        }).catch((e: any) => {
            this.ready = false;
            this.authenticated = false;
            console.error(`Whatsapp: error inicializando cliente wa`, e);
            this.status = `error inicializando cliente wa: ${e}`;
        });
    }

    get isReady() {
        return this.ready;
    }


    create(createWebhookDto: IWebhookRequest) {
        this.logService.create(createWebhookDto);
        switch (createWebhookDto.fulfillmentInfo?.tag) {
            case "inicio":
                return this.inicio(createWebhookDto);
                break;
        }
    }

    findAll() {
        return `This action returns all webhook`;
    }

    findOne(id: number) {
        return `This action returns a #${id} webhook`;
    }

    update(id: number, updateWebhookDto: UpdateWebhookDto) {
        return `This action updates a #${id} webhook`;
    }

    remove(id: number) {
        return `This action removes a #${id} webhook`;
    }

    getQr() {
        return this.qr;
    }

    private inicio(createWebhookDto: IWebhookRequest): IWebhookResponse {
        const deuda = 200_000;
        const retraso = 20;
        return {
            fulfillmentResponse: {
                messages: [
                    {
                        text: {
                            text: ["Hola, Aldo Javier, le contactamos desde el Banco Nacional de Fomento" +
                            ` para informarle que tiene una deuda activa de ${deuda.toLocaleString("es-PY")} Gs.` +
                            ` Con un retraso de ${retraso} dias.`]
                        }
                    }, {
                        text: {
                            text: ["Cuando cree usted que podria pagarlo?"]
                        }
                    }
                ]
            },
            sessionInfo: {
                parameters: {
                    deuda: { numberValue: deuda },
                    retraso: { numberValue: retraso}
                }
            }
        };
    }
}

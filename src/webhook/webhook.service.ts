import { Injectable } from "@nestjs/common";
import { CreateWebhookDto } from "./dto/create-webhook.dto";
import { UpdateWebhookDto } from "./dto/update-webhook.dto";
import { LogService } from "../log/log.service";

@Injectable()
export class WebhookService {

    constructor(private readonly logService: LogService) {}

    create(createWebhookDto: any) {
        this.logService.create(createWebhookDto)
        return "This action adds a new webhook";
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
}
import { Module } from "@nestjs/common";
import { WebhookService } from "./webhook.service";
import { WebhookController } from "./webhook.controller";
import { LogModule } from "../log/log.module";

@Module({
    controllers: [WebhookController],
    providers: [WebhookService],
    imports: [
        LogModule
    ]
})
export class WebhookModule {
}

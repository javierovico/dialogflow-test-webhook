import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LogModule } from "./log/log.module";
import { dataSourceOptions } from "./db/datasource";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WebhookModule } from './webhook/webhook.module';
import { ContactoModule } from './contacto/contacto.module';
import { MessageModule } from './message/message.module';
import { DeudaModule } from './deuda/deuda.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(dataSourceOptions),
        LogModule,
        WebhookModule,
        ContactoModule,
        MessageModule,
        DeudaModule,
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {
}

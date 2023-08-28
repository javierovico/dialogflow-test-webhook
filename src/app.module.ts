import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LogModule } from "./log/log.module";
import { dataSourceOptions } from "./db/datasource";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WebhookModule } from './webhook/webhook.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(dataSourceOptions),
        LogModule,
        WebhookModule,
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {
}

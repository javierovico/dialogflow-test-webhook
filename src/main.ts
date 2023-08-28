import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from './app.module';
import { join } from "path";
import { NestExpressApplication } from "@nestjs/platform-express";
import { ClassSerializerInterceptor, HttpStatus, ValidationPipe } from "@nestjs/common";
import { PORT } from "./config";
import { useContainer } from "class-validator";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
    app.useGlobalPipes(new ValidationPipe({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        transform: true,
        validationError: { target: true, value: true },
        enableDebugMessages: true,
    }));
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.useStaticAssets(join(__dirname, '..', 'public'));
    // app.useStaticAssets(join(__dirname, '..', 'public', 'public/vertex'));
    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    app.setViewEngine('hbs');
    app.enableCors()
    console.log(`App listen on port ${PORT}`)
    await app.listen(PORT);
}

bootstrap();

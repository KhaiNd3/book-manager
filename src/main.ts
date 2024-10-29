import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const swaggerConfig = new DocumentBuilder()
        .setTitle('Testing API swagger')
        .setDescription('Just Testing This swagger to see if it work')
        .setVersion('1.0')
        .addTag('Books')
        .addApiKey(
            { type: 'apiKey', name: 'x-api-key', in: 'header' },
            'API-KEY',
        )
        .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document);

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true, // Only accept variable in dto
            forbidNonWhitelisted: true, // Reject extra variable not in dto
        }),
    );

    const port = configService.get('app.port');
    await app.listen(port);
}
bootstrap();

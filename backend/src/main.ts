import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    // const appOptions = { cors: true };
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');

    const options = new DocumentBuilder()
        .setTitle('Kinx example')
        .setDescription('kinx nestjs redlock')
        .setVersion('1.0')
        .setBasePath('api')
        // .addBearerAuth
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/docs', app, document);

    await app.listen(3000);
}
bootstrap();
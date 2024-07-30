import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const logger = new Logger();

  // Swagger configuration
  const options = new DocumentBuilder()
    .setTitle('nestjs redis')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const port = 3000;
  await app.listen(port, () => {
    logger.log(`Server is running on port ${port}`);
  });
}

bootstrap();

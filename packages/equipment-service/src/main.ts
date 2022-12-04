import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('equipment');
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI
  });

  const config = new DocumentBuilder()
    .setTitle('Equipment Service')
    .setDescription('API for retrieving equipment data')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/equipment/docs', app, document);

  console.log('sdfiosdfoisoidfio');

  await app.listen(process.env.PORT || 3000);
}
bootstrap();

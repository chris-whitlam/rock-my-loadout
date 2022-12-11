import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('loadouts');
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config = new DocumentBuilder()
    .setTitle('Loadout Service')
    .setDescription('API for retrieving and creating loadouts')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/loadouts/docs', app, document);

  await app.listen(process.env.PORT || 3001);
}
bootstrap();

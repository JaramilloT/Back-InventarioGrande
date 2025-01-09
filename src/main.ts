import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as express from 'express';
import * as path from 'path';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';

dotenv.config(); 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.FRONTEND_URL, 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.use(bodyParser.json());

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );


  const config = new DocumentBuilder()
    .setTitle('INVENTARIO')
    .setDescription('PCS')
    .setVersion('1.0')
    .addTag('INVENTARIO')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('INVENTARIO', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0'); // Escuchar en 0.0.0.0 para acceso desde cualquier IP local
}

bootstrap();

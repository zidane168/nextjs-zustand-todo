import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; 

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
  // swagger setup
  const config = new DocumentBuilder()
      .setTitle('Setting CRUD')
      .setDescription('This is automatic generate CRUD by nestjsx/crud ')
      .setVersion('1.0')
      .addTag('setting')
      .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document);
  app.enableCors(); 

  await app.listen(8000);
}
bootstrap();

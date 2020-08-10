import { NestFactory, NestApplication } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
const PORT = 3000;

async function bootstrap() {
  const app: NestApplication = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Users Api')
    .setDescription('The User API description')
    .setVersion('1.0')
    // .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT, () => {
    console.log(`Server listening on Port: ${PORT}`);
  });
}
bootstrap();

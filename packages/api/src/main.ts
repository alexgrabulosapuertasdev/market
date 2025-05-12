import { NestFactory } from '@nestjs/core';
import * as cookieparser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieparser());
  app.enableCors({
    origin: ['http://localhost:4200', 'http://localhost:8081'],
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();

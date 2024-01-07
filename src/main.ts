import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express/interfaces/nest-express-application.interface';
import { serverPort } from './config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('api');

  await app.listen(serverPort, () =>
    console.log(`Сервер успешно стартанул на ${serverPort} порту!`),
  );
}

bootstrap();

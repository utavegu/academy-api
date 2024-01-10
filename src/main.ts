import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express/interfaces/nest-express-application.interface';
import { serverPort } from './config/variables';
import { ExtendedException } from './common/extended-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('api').useGlobalFilters(new ExtendedException());

  await app.listen(serverPort, () =>
    console.log(`Сервер успешно стартанул на ${serverPort} порту!`),
  );
}

bootstrap();

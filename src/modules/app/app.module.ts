import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Poll } from '../test/entities/poll.entity';
import { PollModule } from '../test/poll.module';
import {
  dbName,
  dbPassword,
  dbPort,
  dbServiceName,
  dbUsername,
} from 'src/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: dbServiceName,
      port: Number(dbPort), // TODO: Ну вот чтобы такой порнухи не было, лучше конечно нестовый конфиг с типизацией и геттерами
      username: dbUsername,
      password: dbPassword,
      database: dbName,
      entities: [Poll],
      synchronize: true,
    }),
    PollModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

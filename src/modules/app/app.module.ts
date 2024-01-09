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
import { Student } from '../students/entities/student.entity';
import { Group } from '../groups/entities/group.entity';
import { GroupModule } from '../groups/group.module';
import { StudentModule } from '../students/student.module';
import { Contact } from '../contacts/entities/contact.entity';
import { ContactsModule } from '../contacts/contacts.module';

@Module({
  imports: [
    // TODO: тоже в конфиг
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: dbServiceName,
      port: Number(dbPort), // TODO: Ну вот чтобы такой порнухи не было, лучше конечно нестовый конфиг с типизацией и геттерами
      username: dbUsername,
      password: dbPassword,
      database: dbName,
      entities: [Poll, Student, Group, Contact],
      synchronize: true,
    }),
    PollModule,
    StudentModule,
    GroupModule,
    ContactsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

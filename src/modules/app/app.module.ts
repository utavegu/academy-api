import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PollModule } from '../test/poll.module';
import { GroupModule } from '../groups/group.module';
import { StudentModule } from '../students/student.module';
import { ContactsModule } from '../contacts/contacts.module';
import { DisciplinesModule } from '../disciplines/disciplines.module';
import { TeachersModule } from '../teachers/teachers.module';
import { dbConnectionConfig } from 'src/config/dbConnectionConfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConnectionConfig),
    PollModule,
    StudentModule,
    GroupModule,
    ContactsModule,
    DisciplinesModule,
    TeachersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

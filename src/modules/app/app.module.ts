import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupModule } from '../groups/group.module';
import { StudentModule } from '../students/student.module';
import { ContactsModule } from '../contacts/contacts.module';
import { DisciplinesModule } from '../disciplines/disciplines.module';
import { TeachersModule } from '../teachers/teachers.module';
import { dbConnectionConfig } from 'src/config/dbConnectionConfig';
import { PersonalDataModule } from '../personal-data/personal-data.module';
import { AuditoriumsModule } from '../auditoriums/auditorium.module';
import { LecturesModule } from '../lectures/lectures.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConnectionConfig),
    StudentModule,
    GroupModule,
    ContactsModule,
    DisciplinesModule,
    TeachersModule,
    PersonalDataModule,
    AuditoriumsModule,
    LecturesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

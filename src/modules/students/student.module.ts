import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { PersonalDataModule } from '../personal-data/personal-data.module';
import { ContactsModule } from '../contacts/contacts.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student]),
    PersonalDataModule,
    ContactsModule,
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
